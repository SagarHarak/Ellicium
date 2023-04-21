Param(
    [string]$TenantId,

    [Parameter(Mandatory = $false)]
    [string]$BillCode,

    [Parameter(Mandatory = $false)]
    [string]$ProjectCodeName,

    [Parameter(Mandatory = $false)]
    [string]$InformationOwner,

    [Parameter(Mandatory = $false)]
    [string]$ProjectResourceIdentifier,

    [Parameter(Mandatory = $false)]
    [ValidateSet("dev", "uat", "prod")]
    [string]$Environment = "dev",

    [string] $ADAdminName,
    [string] $AADAdminId,

    [string] $ADAdminObjectid,

    [ValidateSet("eastus", "eastus2", "centralus", "uksouth", "ukwest", "japaneast", "japanwest", "eastasia")]
    [string]$ResourceGroupLocation = "eastus2",

    [string] $departmentTag,

    [string] $budgetOwnerTag,

    [string] $createdby,

    [string] $productTag,

    [string[]]$allowedIpAddresses,

    [string]$ArtifactStorageContainerName = "storageartifacts",

    [string]$artifactStagingDirectory =".",

    [string]$directoryReaderGroup,

    [string]$ApplicationReaderGroupId,

    [string]$suffix = "",

    [string]$ADLSContainer = "gtoprimedev",

    [string]$deploymentPrincipalObjectId,

    [Hashtable]$templateParameters = @{  }
)

# Connect MgGraph for running Mg Graph commands
$context = Get-AzContext
$graphToken = [Microsoft.Azure.Commands.Common.Authentication.AzureSession]::Instance.AuthenticationFactory.Authenticate($context.Account, $context.Environment, $context.Tenant.Id.ToString(), $null, [Microsoft.Azure.Commands.Common.Authentication.ShowDialog]::Never, $null, "https://graph.microsoft.com").AccessToken
Connect-MgGraph -AccessToken $graphToken

# Setup options and variables
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
. .\Scripts\referenceFunctions.ps1

$tags = @{
    "Bill Code"         = $BillCode
    "Project Code Name" = $ProjectCodeName
    "Information Owner" = $InformationOwner
    "Budget Owner"      = $budgetOwnerTag
    "Department"        = $departmentTag
    "Product"           = $productTag
    "Environment"       = $Environment
}

# Build Resource Group and Artifacts Storage Account Names

$ResourceGroupName = Format-ResourceGroupName

$artifactStorageResourceGroupName = $ResourceGroupName
$ArtifactStorageAccountName = Build-ResourceName 1 "STA" "arts" -lowerCase

$ArtifactsStagingDirectory = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($PSScriptRoot, $ArtifactsStagingDirectory))

# Create Resource Group and Artifact Storage Account

Write-Host "`nStep1: Creating resource group $ArtifactsStorageResourceGroupName and artifact storage account $ArtifactStorageAccountName" -ForegroundColor Green

New-AzResourceGroup -Name $artifactStorageResourceGroupName -Location $ResourceGroupLocation -Tag $tags -Verbose -Force -ErrorAction Stop

try {
    .\Scripts\Create-ArtifactsStorageAccount.ps1 `
        -ResourceGroupName $artifactStorageResourceGroupName `
        -ResourceGroupLocation $ResourceGroupLocation `
        -StorageAccountName $ArtifactStorageAccountName
}
catch {
    throw $_
}


# Build Resource Names

<# Sample Resource Names for other Resoruce Types
#>
$ADLSName = Build-ResourceName 1 "STA" "data" -lowerCase
$keyVaultName = Build-ResourceName 1 "KV" -lowerCase
$CosmosDBaccountName = "cosmosdb-" + $ProjectCodeName + "-" + $Environment
$WebAppServicePlan = Build-ResourceName 2 "WSP" "wbp" -lowerCase
$WebAppName = Build-ResourceName 2 "CWS" "wbp" -lowerCase
$FrontDoorName = Build-ResourceName 1 "FD" -lowerCase
$WafPolicyName = Build-ResourceName 1 "FD" "WAF" -lowerCase
$appInsightsName = Build-ResourceName 1 "AAI" -lowerCase

# Create user WebApp App Registrations
$WebAppRegistration = "appreg_" + $WebAppName



try {

    $AppRegistrationResult = .\Scripts\AppRegistration\AppRegistrations.ps1 `
                                -WebAppName $WebAppName `
                                -WebAppRegistration $WebAppRegistration
}
catch {
    throw $_
}



# Add group to enterprise application of Web App
$AddGroupWebappreg = Add-GroupToEnterpriseApplication $ApplicationReaderGroupId $WebAppRegistration


Write-Output "Generate Client Secret for WebApp AppRegistration" $WebAppRegSecretName_check
$StartDate = Get-Date
$EndDate = $StartDate.AddYears(1)
$WebAppRegSecretName = "WebAppAuthSecret"

$WebAppRegSecretName_check =( Get-AzADAppCredential -DisplayName $WebAppRegistration `
                                | Where-Object{ $_.DisplayName -eq $WebAppRegSecretName}).DisplayName

Write-Output "WebAppRegSecretName_check" $WebAppRegSecretName_check


$WebAppRegObject = Get-AzADApplication -DisplayName $WebAppRegistration

if ( $null -eq $WebAppRegSecretName_check) {

    $PassWordCred_hash = @{
        DisplayName = $WebAppRegSecretName
        StartDateTime = $StartDate
        EndDateTime = $EndDate
    }

    # Generate Client Secret for web App Registration 
    $WebAppRegistrationSecret = (New-AzADAppCredential `
                                    -ObjectId $WebAppRegObject.Id `
                                    -PasswordCredentials $PassWordCred_hash).secretText

    Write-Host 'WebAppRegSecret secret' $WebAppRegistrationSecret

}
elseif ( $WebAppRegSecretName_check -eq $WebAppRegSecretName ) {
    # if Web appreg secret already exists, get it from keyvault
    $WebAppRegistrationSecret = Get-AzKeyVaultSecret `
                                    -VaultName $keyVaultName `
                                    -Name "WebAppRegistrationSecret" `
                                    -AsPlainText
}

#Getting app registration client id
$AppRegistrationAppId = (Get-AzADApplication -DisplayName $WebAppRegistration).AppId

# Deploy main ARM template
Write-Host "`nStep 2: Deploying main resource template" -ForegroundColor Green
try {
    
    $templateParameters["CosmosDBaccountName"] = $CosmosDBaccountName
    $templateParameters["WebAppServicePlan"] = $WebAppServicePlan
    $templateParameters["WebAppName"] = $WebAppName
    $templateParameters["keyVaultName"] = $keyVaultName
    $templateParameters["AppRegistrationAppId"] = $AppRegistrationAppId
    $templateParameters["ProjectCodeName"] = $ProjectCodeName
    $templateParameters["createdby"] = $createdby
    $templateParameters["FrontDoorName"] = $FrontDoorName
    $templateParameters["WafPolicyName"] = $WafPolicyName
    $templateParameters["AppInsightsName"] = $appInsightsName
    #$templateParameters["<ParameterName>"] = $<parameterName>

    $TemplateFilePath = [System.IO.Path]::Combine($ArtifactsStagingDirectory, ".\Artifacts\azuredeploy.json")

    Write-Host ($templateParameters | Out-String)

    $deploymentResults = .\Deploy-AzureResourceGroup.ps1 `
        -UploadArtifacts `
        -ResourceGroupLocation $ResourceGroupLocation `
        -ResourceGroupName $artifactStorageResourceGroupName `
        -StorageAccountName $ArtifactStorageAccountName `
        -ArtifactStagingDirectory $artifactStagingDirectory `
        -TemplateParameters $templateParameters `
        -TemplateFile $TemplateFilePath `
        -Tags $tags 

}
catch {
    throw $_
}

# Clean-up the artifacts storage account
Write-Host "`nStep 3: Removing the Artifacts Storage Account used for deployment..." -ForegroundColor Green
Remove-AzStorageAccount -ResourceGroupName $artifactStorageResourceGroupName -Name $ArtifactStorageAccountName -Force


######################################################################################################

# Post Deployment Activities

# giving service connection permission in KeyVault Access Policy
$ServicePrincipleObjectID = (Get-AzADServicePrincipal | Where-Object{ $_.DisplayName -eq $ADAdminName}).Id
Set-AzKeyVaultAccessPolicy -ResourceGroupName $artifactStorageResourceGroupName `
    -VaultName $keyVaultName `
    -ObjectId $ServicePrincipleObjectID `
    -PermissionsToSecrets Get, List, Set, Delete, Recover, Backup, Restore `
    -BypassObjectIdValidation 
    Write-Output 'Access to service principal on key vault done'
    
# giving  Web app permission in KeyVault Access Policy
$WebAppObjectID = (Get-AzADServicePrincipal | Where-Object{ $_.DisplayName -eq $WebAppName}).Id
Write-Output 'Web app object ID' $WebAppObjectID
Set-AzKeyVaultAccessPolicy -ResourceGroupName $artifactStorageResourceGroupName `
    -VaultName $keyVaultName `
    -ObjectId $WebAppObjectID `
    -PermissionsToSecrets Get, List `
    -BypassObjectIdValidation 
    Write-Output 'Access to Web app on key vault done'

Write-Host $CosmosDBaccountName

$ResourceId = (Get-AzResource -ResourceGroupName $artifactStorageResourceGroupName `
                                -Name $CosmosDBaccountName `
                                -ResourceType 'Microsoft.DocumentDB/databaseAccounts').ResourceId
Write-Host $ResourceId
    
# Get read-write key for the Cosmos DB account
$CosmosDBAccountKeys = (Get-AzCosmosDBAccountKey -ResourceId $ResourceId).PrimaryMasterKey
# $CosmosDbkeySecretValue = ConvertTo-SecureString -String $CosmosDBAccountKeys.PrimaryMasterKey -AsPlainText -Force

# Add cosmosDb uri in keyvault
$CosmosDbAccount = "https://" + $CosmosDBaccountName + ".documents.azure.com:443/"

# Add secrets in key vault 
Write-Host " Add secrets in key vault" - ForegroundColor Green 

$hashtable = @{
    "CosmosDBAccountKeys" =  $CosmosDBAccountKeys;
    "TenantId" = $TenantId;
    "AppRegistrationClientId" = $AppRegistrationAppId;
    "CosmosDbAccount" = $CosmosDbAccount;
    "WebAppRegistrationSecret" = $WebAppRegistrationSecret
}

foreach ($h in $hashtable.GetEnumerator() ) { 

    Write-Host "$($h.Name)"
    $secretvalue = ConvertTo-SecureString $($h.Value) -AsPlainText -Force
    Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $($h.Name) -SecretValue $secretvalue

}

# Generating variables to be used in Web app deployment Application settings task
$CosmosDbAccount_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/CosmosDbAccount/)"
$WebAppRegistrationSecretr_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/WebAppRegistrationSecret/)"
$CosmosDBAccountKeys_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/CosmosDBAccountKeys/)"

###############################################################################################
# passing few variables to be used in release pipeline
Write-Host "####vso[task.setvariable variable=ResourceGroupName;isoutput=true]$artifactStorageResourceGroupName"
Write-Host "####vso[task.setvariable variable=keyVaultName;isoutput=true]$keyVaultName"
Write-Host "####vso[task.setvariable variable=WebAppName;isoutput=true]$WebAppName"
Write-Host "####vso[task.setvariable variable=CosmosDBAccountKeys;isoutput=true]$CosmosDBAccountKeys"



# Web app application settings 
Write-Host "####vso[task.setvariable variable=CosmosDbAccount_kvuri;isoutput=true]$CosmosDbAccount_kvuri"
Write-Host "####vso[task.setvariable variable=WebAppRegistrationSecretr_kvuri;isoutput=true]$WebAppRegistrationSecretr_kvuri"
Write-Host "####vso[task.setvariable variable=CosmosDBAccountKeys_kvuri;isoutput=true]$CosmosDBAccountKeys_kvuri"


