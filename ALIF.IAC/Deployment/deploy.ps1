Param(
    [string]$TenantId = "",

    [Parameter(Mandatory = $false)]
    [string]$BillCode = "",

    [Parameter(Mandatory = $false)]
    [string]$ProjectCodeName = "",

    [Parameter(Mandatory = $false)]
    [string]$InformationOwner = "",

    [Parameter(Mandatory = $false)]
    [string]$ProjectResourceIdentifier = "",

    [Parameter(Mandatory = $false)]
    [ValidateSet("dev", "uat", "prod")]
    [string]$Environment = "dev",

    [string] $ADAdminName,

    [string] $sqladminLogin,

    [ValidateSet("eastus", "eastus2", "centralus", "uksouth", "ukwest", "japaneast", "japanwest", "eastasia")]
    [string]$ResourceGroupLocation = "eastus2",

    [string] $departmentTag = "",

    [string] $budgetOwnerTag = "",

    [string] $productTag = "",

    [string[]]$allowedIpAddresses,

    [string] $DatabaseSchemaName,
    [string]$deploymentPrincipalObjectId,

    [string]$ArtifactStorageContainerName = "storageartifacts",

    [string]$artifactStagingDirectory = ".",

    [string]$ApplicationReaderGroupId,

    [string]$productID,

    [Hashtable]$templateParameters = @{ }
)

# Connect MgGraph for running Mg Graph commands
$context = Get-AzContext
$graphToken = [Microsoft.Azure.Commands.Common.Authentication.AzureSession]::Instance.AuthenticationFactory.Authenticate($context.Account, $context.Environment, $context.Tenant.Id.ToString(), $null, [Microsoft.Azure.Commands.Common.Authentication.ShowDialog]::Never, $null, "https://graph.microsoft.com").AccessToken
Connect-MgGraph -AccessToken $graphToken

# Install Azure AD module
Install-Module AzureAD

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
    "Project ID"        = $productID
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


$keyVaultName = Build-ResourceName 1 "KVL" -lowerCase
$sqlServerName = Build-ResourceName 1 "SQL" -lowerCase
$sqlDBName = "sqldb-" + $ProjectCodeName + "-" + $Environment
$AppServicePlanName = Build-ResourceName 1 "ASP" -lowerCase
$Appserviceuiname = Build-ResourceName 1 "WES" "WEB" -lowerCase
$Appserviceapiname = Build-ResourceName 2 "WES" "API" -lowerCase
$FrontDoorName = Build-ResourceName 1 "FD" -lowerCase
$WafPolicyName = Build-ResourceName 1 "FD" "WAF" -lowerCase
$sqladminLoginPassword = New-Password


# App Registrations
$WebAppRegistration = "appreg-" + $Appserviceuiname

$FirewallRulesArray =$allowedIpAddresses.replace(' ','').Split(",")

# Deploy main ARM template
Write-Host "`nStep 2: Deploying main resource template" -ForegroundColor Green
try {
    

    $templateParameters["keyVaultName"] = $keyVaultName
    $templateParameters["ProjectCodeName"] = $ProjectCodeName
    $templateParameters["sqlServerName"] = $sqlServerName
    $templateParameters["sqlDBName"] = $sqlDBName
    $templateParameters["AD_admin_name"] = $ADAdminName
    $templateParameters["AD_admin_objectid"] = $deploymentPrincipalObjectId
    $templateParameters["sqladminLogin"] = $sqladminLogin
    $templateParameters["sqladminLoginPassword"] = $sqladminLoginPassword
    $templateParameters["firewall_rule1"] = $FirewallRulesArray[0]
    $templateParameters["firewall_rule2"] = $FirewallRulesArray[1]
    $templateParameters["firewall_rule3"] = $FirewallRulesArray[2]
    $templateParameters["firewall_rule4"] = $FirewallRulesArray[3]
    $templateParameters["firewall_rule5"] = $FirewallRulesArray[4]
    $templateParameters["Appserviceuiname"] = $Appserviceuiname
    $templateParameters["AppServicePlanName"] = $AppServicePlanName
    $templateParameters["Appserviceapiname"] = $Appserviceapiname
    $templateParameters["FrontDoorName"] = $FrontDoorName
    $templateParameters["WafPolicyName"] = $WafPolicyName

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

# deploymentPrincipalObjectId permission in  KeyVault Access Policy 

Set-AzKeyVaultAccessPolicy -ResourceGroupName $artifactStorageResourceGroupName `
    -VaultName $keyVaultName `
    -ObjectId $deploymentPrincipalObjectId `
    -PermissionsToSecrets Get,List,Set `
    -BypassObjectIdValidation 
    Write-Output 'Key vault get, list, set access to deploymentPrincipalObjectId'

# giving WebAppAPI get and list permission in  KeyVault Access Policy
$WebAppAPI_PrincipleID = (Get-AzWebApp -Name $Appserviceapiname -ResourceGroupName $artifactStorageResourceGroupName ).Identity.PrincipalId
Set-AzKeyVaultAccessPolicy -ResourceGroupName $artifactStorageResourceGroupName `
    -VaultName $keyVaultName `
    -ObjectId $WebAppAPI_PrincipleID  `
    -PermissionsToSecrets Get,List `
    -BypassObjectIdValidation 
    Write-Output 'Key vault get, list access to WebAppAPI'


# Add secrets in key vault 
Write-Host "Add secrets in key vault" - ForegroundColor Green 

# converting sql password from System.secure.string to System.string to store in key vault
$BSTRsqlpassword = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($sqladminLoginPassword)
$sqladminLoginPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTRsqlpassword)

$hashtable = @{
    "SQLUser" =  $sqladminLogin;
    "SQLPassword" =  $sqladminLoginPassword;
    "ServerName" =  $sqlServerName + ".database.windows.net";
    "DatabaseName" = $sqlDBName;
    "SQLPort"  = 1433;
    "SQLSchema" = $DatabaseSchemaName
}
foreach ($h in $hashtable.GetEnumerator() ) {

    Write-Host "$($h.Name)"
    $secretvalue = ConvertTo-SecureString $($h.Value) -AsPlainText -Force
    Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $($h.Name) -SecretValue $secretvalue
}
# App registration for WebApp Authentification 
Write-Host " App registration for WebApp Authentification" - ForegroundColor Green

# Get azure front door endpoint hostname to be passed into UI code while UI deployment
$FrontDoorEndpointHostname = Get-AzFrontDoorCdnEndpoint `
                                -EndpointName $FrontDoorName `
                                -ProfileName $FrontDoorName `
                                -ResourceGroupName $artifactStorageResourceGroupName

Write-Output "Azure front door Endpoint Hostname" $FrontDoorEndpointHostname.HostName
$SPA_Redirect_URI = 'https://' + $FrontDoorEndpointHostname.HostName

$WebApp_Name = (Get-AzADApplication -DisplayName $WebAppRegistration).DisplayName
if ($null -eq $WebApp_Name ) {
    #Create Azure AD app Registration
    $AzureWebbAppObject = New-AzADApplication `
                            -DisplayName $WebAppRegistration `
                            -SPARedirectUri $SPA_Redirect_URI

    # Create A service Principal for the above app Registration
    New-AzADServicePrincipal `
        -ApplicationId $AzureWebbAppObject.appId 
    Write-Host 'Create A service Principal for WebApp App registration' 
    
}

# Add Application Reader group to enterprise application of Web App
$AddGroupWebappreg = Add-GroupToEnterpriseApplication $ApplicationReaderGroupId $WebAppRegistration

# getting Webappui ObjectID and Appid to store in KV
$WebAppRegistrationObjectID = (Get-AzADApplication -DisplayName $WebAppRegistration).ID
$WebAppRegistrationAppID = (Get-AzADApplication -DisplayName $WebAppRegistration).AppID

# Add user.read.all , email , profile (Application)  api permission to above created app 
Write-Host "`nStep 04 : Add user.read , email ,openid, profile,offline_access ,User.Read.All (Application) api permission to above created app" - ForegroundColor Green 

$WebAppRegistrationObjectID = (Get-AzADApplication -DisplayName $WebAppRegistration).ID 
$MicrosoftGraphAppId = '00000003-0000-0000-c000-000000000000'

# Adding API Delegated permission rule
$PermissionId = @(
    "e1fe6dd8-ba31-4d61-89e7-88639da4683d",
    "14dad69e-099b-42c9-810b-d002981feec1",
    "37f7f235-527c-4136-accd-4a02d197296e",
    "7427e0e9-2fba-42fe-b0c0-848c9e6a8182",
    "64a6cdd6-aab1-4aaf-94b8-3cc8405e90d0"
)
foreach($id in $PermissionId){
    Write-Host $id
$apidelegate = (Get-AzADAppPermission -ObjectId $WebAppRegistrationObjectID `
                           | Where-Object {$_.Id -eq $id}).Id.Guid
if ($null -eq $apidelegate){
    Add-AzADAppPermission -ObjectId $WebAppRegistrationObjectID -ApiId $MicrosoftGraphAppId -PermissionId $id -Type Scope }
}

# Adding API Application permission rule
$UserReadAll = "df021288-bdef-4463-88db-98f22de89214"
$apiapplication = (Get-AzADAppPermission -ObjectId $WebAppRegistrationObjectID `
                              | Where-Object {$_.Id -eq $UserReadAll}).Id.Guid
if ($null -eq $apiapplication){                               
   Add-AzADAppPermission -ObjectId $WebAppRegistrationObjectID -ApiId $MicrosoftGraphAppId -PermissionId $UserReadAll -Type Role
}
##########################################################################################################

# Add sql server admin if not exists 
Write-Host "Add sql server admin if not exists " - ForegroundColor Green 

$ADAdminAppid = (Get-AzADServicePrincipal | Where-Object{ $_.DisplayName -eq $ADAdminName}).AppId

$sqladadmincheck = (Get-AzSqlServerActiveDirectoryAdministrator -ServerName $sqlServerName -ResourceGroupName $artifactStorageResourceGroupName).DisplayName
Write-Host  'sqladadmin' $sqladadmincheck       
if ($null -eq $sqladadmincheck){
    Set-AzSqlServerActiveDirectoryAdministrator `
    -DisplayName $ADAdminName `
    -ObjectId $ADAdminAppid `
    -ServerName $sqlServerName `
    -ResourceGroupName $artifactStorageResourceGroupName 
   }
else{
    # if $sqladadmincheck not null, remove admin and add Service connection as admin 
    Remove-AzSqlServerActiveDirectoryAdministrator `
        -ServerName $sqlServerName `
        -ResourceGroupName $artifactStorageResourceGroupName

    Set-AzSqlServerActiveDirectoryAdministrator `
        -DisplayName $ADAdminName `
        -ObjectId $ADAdminAppid `
        -ServerName $sqlServerName `
        -ResourceGroupName $artifactStorageResourceGroupName 
}
###########################################################################################################

# Add agent job IP and fire DDL in Database 
Write-Host "Add agent job IP and fire DDL queries in Database " - ForegroundColor Green 

# Getting Agent Job Ip Address
$AgentJobIp = (Invoke-WebRequest -uri "http://ifconfig.me/ip").Content
Write-Host "Agent Job Ip:" $AgentJobIp
$firewallrulename = "AgentJobFirewallRule"

$check_firewallrule = Get-AzSqlServerFirewallRule -ResourceGroupName $artifactStorageResourceGroupName `
-ServerName $sqlServerName `
| Where-Object FirewallRuleName -eq $firewallrulename

if($null -eq $check_firewallrule){
   New-AzSqlServerFirewallRule    -ResourceGroupName $artifactStorageResourceGroupName `
   -ServerName $sqlServerName `
   -FirewallRuleName  $firewallrulename `
   -StartIpAddress $AgentJobIp `
   -EndIpAddress $AgentJobIp

   Write-Host "Added Agent Job firewall rule"
}
else{
   Set-AzSqlServerFirewallRule    -ResourceGroupName $artifactStorageResourceGroupName `
   -ServerName $sqlServerName `
   -FirewallRuleName $firewallrulename `
   -StartIpAddress $AgentJobIp `
   -EndIpAddress $AgentJobIp
   Write-Host "Updated Agent Job firewall rule"
}

###################################################################################################

# Get Username and Password from key vault 
$Username = Get-AzKeyVaultSecret -VaultName $keyVaultName -Name "SQLUser" -AsPlainText
$Password = Get-AzKeyVaultSecret -VaultName $keyVaultName -Name "SQLPassword" -AsPlainText
$serverinstance = $sqlServerName + ".database.windows.net"
$defaultschemaname = "dbo"
$schemaname = $DatabaseSchemaName

# # Create connection with the database
# $connectionString = "Data Source=$serverinstance;Initial Catalog=$sqlDBName;User ID=$Username;Password=$Password"
# $connection = New-Object -TypeName System.Data.SqlClient.SqlConnection($connectionString)
# $connection.Open()
# Write-Host "Database Connected"

# # create schemas
# $schemafile = ".\Scripts\SQlDatabase\DDL\DDL_Schema.sql"
# $schema_object = (Get-Content -Path $schemafile -Raw) -replace $defaultschemaname, $schemaname
# $create_schema = New-Object -TypeName System.Data.SqlClient.SqlCommand($schema_object, $connection)
# $create_schema.ExecuteNonQuery()
# Write-Host "Schema Created"

# # Create tables 
# $create_table_file = ".\Scripts\SQlDatabase\DDL\DDL_Tables.sql"
# $create_table_object = (Get-Content -Path $create_table_file -Raw) -replace $defaultschemaname, $schemaname
# $create_table_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($create_table_object, $connection)
# $create_table_ddl.ExecuteNonQuery()
# Write-Host "Tables Created"

# # Close connection 
# $connection.Close()

# Removing agent job ip address from sqlserver firewall rule
Write-Host "Remove agent job IP " - ForegroundColor Green 
Remove-AzSqlServerFirewallRule -FirewallRuleName $FirewallRuleName `
    -ResourceGroupName $artifactStorageResourceGroupName `
    -ServerName $sqlServerName
Write-Output "Removed agent job ipaddress from sqlserver firewall rule "

######################################################################################################

# generating variables to be used in frontend deployment 
$WebAppApiUrl = 'https://' + $FrontDoorEndpointHostname.HostName +"/api"
$AuthRedirectUri = 'https://' + $FrontDoorEndpointHostname.HostName
$Authority = 'https://login.microsoftonline.com/'+ $TenantId
$SCOPES = "user.read"

###############################################################################################
# passing few variables to be used in release pipeline
Write-Host "####vso[task.setvariable variable=keyVaultName;isoutput=true]$keyVaultName"
Write-Host "####vso[task.setvariable variable=Appserviceuiname;isoutput=true]$Appserviceuiname"
Write-Host "####vso[task.setvariable variable=Appserviceapiname;isoutput=true]$Appserviceapiname"
Write-Host "####vso[task.setvariable variable=ResourceGroupName;isoutput=true]$artifactStorageResourceGroupName"
Write-Host "####vso[task.setvariable variable=sqlServerName;isoutput=true]$sqlServerName"

# variables used when replacing tokens for frontend deployment
Write-Host "####vso[task.setvariable variable=WebAppApiUrl;isoutput=true]$WebAppApiUrl"
Write-Host "####vso[task.setvariable variable=Authority;isoutput=true]$Authority"
Write-Host "####vso[task.setvariable variable=AuthRedirectUri;isoutput=true]$AuthRedirectUri"
Write-Host "####vso[task.setvariable variable=WebAppRegistrationAppID;isoutput=true]$WebAppRegistrationAppID"
Write-Host "####vso[task.setvariable variable=SCOPES;isoutput=true]$SCOPES"


