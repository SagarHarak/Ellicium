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
    [string] $FirewallRule1,
    [string] $FirewallRule2,
    [string] $FirewallRule3,
    [string] $FirewallRule4,
    [string] $FirewallRule5,

    [string] $DatabaseSchemaName,

    [string]$ArtifactStorageContainerName = "storageartifacts",

    [string]$artifactStagingDirectory =".",

    [string]$directoryReaderGroup,

    [string]$suffix = "",

    [string]$ADLSContainer = "gtoprimedev",

    [string]$deploymentPrincipalObjectId,

    [string]$ApplicationReaderGroupId,

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
$sqlServerName = Build-ResourceName 1 "SQL" -lowerCase
$sqlDBName = "sqldb-" + $ProjectCodeName + "-" + $Environment
$appInsightsName = Build-ResourceName 1 "AAI" -lowerCase
$functionAppServicePlan = Build-ResourceName 2 "ASP" "fcn" -lowerCase
$functionAppName = Build-ResourceName 2 "WES" "fcn" -lowerCase
$WebAppUIName = Build-ResourceName 1 "WES" "Web" -lowerCase
$FrontDoorName = Build-ResourceName 1 "FD" -lowerCase
$WafPolicyName = Build-ResourceName 1 "FD" "WAF" -lowerCase
$sqlAdminLogin = "iceadmin"
$sqladminLoginPassword = New-Password

# Create Function and WebApp App Registrations
$WebAppRegistration = "appreg_" + $WebAppUIName
$FunctionAppRegistration = "appreg_" + $functionAppName


try {

    $AppRegistrationResult = .\Scripts\AppRegistration\AppRegistration.ps1 `
                                -functionAppName $functionAppName `
                                -FunctionAppRegistration $FunctionAppRegistration `
                                -WebAppUIName $WebAppUIName `
                                -WebAppRegistration $WebAppRegistration
}
catch {
    throw $_
}

# Add group to enterprise application of function and Web App
$AddGroupFuncappreg = Add-GroupToEnterpriseApplication $ApplicationReaderGroupId $FunctionAppRegistration
$AddGroupWebappreg = Add-GroupToEnterpriseApplication $ApplicationReaderGroupId $WebAppRegistration


Write-Output "Generate Client Secret for FunctionApp AppRegistration" $FuncAppRegSecretName_check
$StartDate = Get-Date
$EndDate = $StartDate.AddYears(1)
$FuncAppRegSecretName = "FunctionAppAuthSecret"

$FuncAppRegSecretName_check =( Get-AzADAppCredential -DisplayName $FunctionAppRegistration `
                                | Where-Object{ $_.DisplayName -eq $FuncAppRegSecretName}).DisplayName

Write-Output "FuncAppRegSecretName_check" $FuncAppRegSecretName_check

$FuncAppRegObject = Get-AzADApplication -DisplayName $FunctionAppRegistration

if ( $null -eq $FuncAppRegSecretName_check) {

    $PassWordCred_hash = @{
        DisplayName = $FuncAppRegSecretName
        StartDateTime = $StartDate
        EndDateTime = $EndDate
    }
    # Generate Client Secret for function App Registration 
    $FuncAppRegistrationSecret = (New-AzADAppCredential `
                                    -ObjectId $FuncAppRegObject.Id `
                                    -PasswordCredentials $PassWordCred_hash).secretText

    Write-Host 'FuncAppRegSecret secret' $FuncAppRegistrationSecret

}
elseif ( $FuncAppRegSecretName_check -eq $FuncAppRegSecretName ) {
    # if function appreg secret already exists, get it from keyvault
    $FuncAppRegistrationSecret = Get-AzKeyVaultSecret `
                                    -VaultName $keyVaultName `
                                    -Name "FuncAppRegistrationSecret" `
                                    -AsPlainText
}


# Deploy main ARM template
Write-Host "`nStep 2: Deploying main resource template" -ForegroundColor Green
try {
    
    $templateParameters["deploymentPrincipalObjectId"] = $deploymentPrincipalObjectId
    $templateParameters["sqlServerName"] = $sqlServerName
    $templateParameters["sqlDBName"] = $sqlDBName
    $templateParameters["appInsightsName"] = $appInsightsName
    $templateParameters["functionAppServicePlan"] = $functionAppServicePlan
    $templateParameters["functionAppName"] = $functionAppName
    $templateParameters["keyVaultName"] = $keyVaultName
    $templateParameters["WebAppUIName"] = $WebAppUIName
    $templateParameters["FrontDoorName"] = $FrontDoorName
    $templateParameters["WafPolicyName"] = $WafPolicyName
    $templateParameters["FuncAppRegistrationSecret"] = $FuncAppRegistrationSecret
    $templateParameters["FuncAppRegistrationAppId"] = $FuncAppRegObject.AppId

    $templateParameters["AD_admin_name"] = $ADAdminName
    $templateParameters["AD_admin_objectid"] = $ADAdminObjectId
    $templateParameters["sqladminLogin"] = $sqladminLogin
    $templateParameters["sqladminLoginPassword"] = $sqladminLoginPassword
    $templateParameters["ProjectCodeName"] = $ProjectCodeName
    $templateParameters["createdby"] = $createdby
    $templateParameters["firewall_rule1"] = $FirewallRule1
    $templateParameters["firewall_rule2"] = $FirewallRule2
    $templateParameters["firewall_rule3"] = $FirewallRule3
    $templateParameters["firewall_rule4"] = $FirewallRule4
    $templateParameters["firewall_rule5"] = $FirewallRule5
    $templateParameters["allowedIpAddresses"] = $allowedIpAddresses

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

#####################################################################################################################


# Get azure front door endpoint hostname to be passed into frontend code while frontend deployment
$FrontDoorEndpointHostname = Get-AzFrontDoorCdnEndpoint `
                                -EndpointName $FrontDoorName `
                                -ProfileName $FrontDoorName `
                                -ResourceGroupName $artifactStorageResourceGroupName

Write-Output "Azure front door Endpoint Hostname" $FrontDoorEndpointHostname.HostName

$SPA_Redirect_URI = 'https://' + $FrontDoorEndpointHostname.HostName + "/dashboard"

# getting Webappui ObjectID and Appid to store in KV
$WebAppRegistrationObjectID = (Get-AzADApplication -DisplayName $WebAppRegistration).ID
$WebAppRegistrationAppID = (Get-AzADApplication -DisplayName $WebAppRegistration).AppID

# Update SPARedirectUri in WebApp App registration for Premium frontdoor
Update-AzADApplication `
    -ObjectId $WebAppRegistrationObjectID `
    -SPARedirectUri $SPA_Redirect_URI

# giving  function app permission in KeyVault Access Policy
$functionAppObjectID = (Get-AzADServicePrincipal | Where-Object{ $_.DisplayName -eq $functionAppName}).Id
Write-Output 'Function app object ID' $functionAppObjectID
Set-AzKeyVaultAccessPolicy -ResourceGroupName $artifactStorageResourceGroupName `
    -VaultName $keyVaultName `
    -ObjectId $functionAppObjectID `
    -PermissionsToSecrets Get, List `
    -BypassObjectIdValidation 
    Write-Output 'Access to function app on key vault done'

# giving service connection permission in KeyVault Access Policy
$ServicePrincipleObjectID = (Get-AzADServicePrincipal | Where-Object{ $_.DisplayName -eq $ADAdminName}).Id
Set-AzKeyVaultAccessPolicy -ResourceGroupName $artifactStorageResourceGroupName `
    -VaultName $keyVaultName `
    -ObjectId $ServicePrincipleObjectID `
    -PermissionsToSecrets Get, List, Set, Delete, Recover, Backup, Restore `
    -BypassObjectIdValidation 
    Write-Output 'Access to service principal on key vault done'

# converting sql password from System.secure.string to System.string to store in key vault
$BSTRsqlpassword = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($sqladminLoginPassword)
$sqladminLoginPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTRsqlpassword)

# Add secrets in key vault 
Write-Host " Add secrets in key vault" - ForegroundColor Green 

$hashtable = @{
    "NodePort" =   3000 ;
    "SQLPassword" =  $sqladminLoginPassword;
    "SQLPort"  = 1433;
    "SQLSchema" = $DatabaseSchemaName;
    "SQLUser" =  $sqladminLogin;
    "TenantId" = $TenantId;
    "DatabaseName" = $sqlDBName;
    "ServerName" = $sqlServerName + ".database.windows.net";
    "FuncAppRegistrationSecret" = $FuncAppRegistrationSecret
}

foreach ($h in $hashtable.GetEnumerator() ) { 

    Write-Host "$($h.Name)"
    $secretvalue = ConvertTo-SecureString $($h.Value) -AsPlainText -Force
    Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $($h.Name) -SecretValue $secretvalue

}


# Add agent job IP and fire DDL in Database 
Write-Host " Add agent job IP and fire DDL queries in Database " - ForegroundColor Green 

$AgentJobIp = (Invoke-WebRequest -uri "http://ifconfig.me/ip").Content
$FirewallRuleName = "AgentJobip"

# getting existing agent job firewall rule name 
$check_firewallrule = (Get-AzSqlServerFirewallRule -ResourceGroupName $artifactStorageResourceGroupName `
                        -ServerName $sqlServerName `
                        | Where-Object{ $_.FirewallRuleName -eq $FirewallRuleName }).FirewallRuleName

# adding agent job ip address in sqlserver firewall rule
if ($null -eq $check_firewallrule) {
    ## if agent ip doesnt exists , add the agent ip rule
    New-AzSqlServerFirewallRule -ResourceGroupName $artifactStorageResourceGroupName `
        -ServerName $sqlServerName -FirewallRuleName $FirewallRuleName `
        -StartIpAddress $AgentJobIp `
        -EndIpAddress $AgentJobIp
        Write-Output "Agent Job firewall rule added."
}
else{
    ## if previous agent ip exists remove the previous ip and add the new Ip rule 
    Remove-AzSqlServerFirewallRule -FirewallRuleName $FirewallRuleName `
        -ResourceGroupName $artifactStorageResourceGroupName `
        -ServerName $sqlServerName 
        Write-Output "Removed agent job ipaddress from sqlserver firewall rule "

    New-AzSqlServerFirewallRule -ResourceGroupName $artifactStorageResourceGroupName `
        -ServerName $sqlServerName -FirewallRuleName $FirewallRuleName `
        -StartIpAddress $AgentJobIp `
        -EndIpAddress $AgentJobIp
        Write-Output "Agent Job firewall rule added."
}

#Get Username and Password from key vault 

$Username = Get-AzKeyVaultSecret -VaultName $keyVaultName -Name "SQLUser" -AsPlainText
$Password = Get-AzKeyVaultSecret -VaultName $keyVaultName -Name "SQLPassword" -AsPlainText
$serverinstance = $sqlServerName + ".database.windows.net"

#Create connection with the database
$connectionString = "Data Source=$serverinstance;Initial Catalog=$sqlDBName;User ID=$Username;Password=$Password"
$connection = New-Object -TypeName System.Data.SqlClient.SqlConnection($connectionString)
$connection.Open()

# create schemas
$schemafile = ".\Scripts\SQlDatabase\DDL\Azure-DDL-schema.sql"
$schema_object = (Get-Content -Path $schemafile -Raw)
$create_schema = New-Object -TypeName System.Data.SqlClient.SqlCommand($schema_object, $connection)
$create_schema.ExecuteNonQuery()

# Remove FK if Exists
$rmv_fk_file = ".\Scripts\SQlDatabase\DDL\RemoveFK.sql"
$rmv_fk_object = (Get-Content -Path $rmv_fk_file -Raw) 
$rmv_fk_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($rmv_fk_object, $connection)
$rmv_fk_ddl.ExecuteNonQuery()

## Create tables 
$create_table_file = ".\Scripts\SQlDatabase\DDL\Azure-DDL-tables.sql"
$create_table_object = (Get-Content -Path $create_table_file -Raw)
$create_table_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($create_table_object, $connection)
$create_table_ddl.ExecuteNonQuery()

# ## Create views 
# $create_view_file = ".\Scripts\SQlDatabase\DDL\Azure-DDL-tables.sql"
# $create_view_object = (Get-Content -Path $create_view_file -Raw)
# $create_view_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($create_view_object, $connection)
# $create_view_ddl.ExecuteNonQuery()

## drop index if exists 
$drop_index_file = ".\Scripts\SQlDatabase\DDL\drop_index.sql"
$drop_index_object = (Get-Content -Path $drop_index_file -Raw)
$drop_index_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($drop_index_object, $connection)
$drop_index_ddl.ExecuteNonQuery()

## create index 
$create_index_file = ".\Scripts\SQlDatabase\DDL\create_index.sql"
$create_index_object = (Get-Content -Path $create_index_file -Raw)
$create_index_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($create_index_object, $connection)
$create_index_ddl.ExecuteNonQuery()

## truncate static tables if exists 
$truncate_table_file = ".\Scripts\SQlDatabase\DDL\truncate_static_tables.sql"
$truncate_table_object = (Get-Content -Path $truncate_table_file -Raw)
$truncate_table_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($truncate_table_object, $connection)
$truncate_table_ddl.ExecuteNonQuery()

#### uploading Data 
$tabledata = Get-ChildItem -Path '.\scripts\SQLDatabase\manual_tables' `
                -filter *.sql -Recurse | ForEach-Object{$_.FullName}
foreach ($file in $tabledata) {

    $replaceschema = (Get-Content -Path $file -Raw) 
    $command = New-Object -TypeName System.Data.SqlClient.SqlCommand($replaceschema, $connection)
    $command.CommandTimeout = 0;
    $command.ExecuteNonQuery()

    Write-Host "file : $file"
}

# add foreign key constraints
$add_fk_file = ".\Scripts\SQlDatabase\DDL\AddFK.sql"
$add_fk_object = (Get-Content -Path $add_fk_file -Raw) 
$add_fk_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($add_fk_object, $connection)
$add_fk_ddl.ExecuteNonQuery()

# Create trigger if not exists
$create_trigger_file = ".\Scripts\SQlDatabase\DDL\create_trigger.sql"
$add_trigger_object = (Get-Content -Path $create_trigger_file -Raw) 
$create_trigger_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($add_trigger_object, $connection)
$create_trigger_ddl.ExecuteNonQuery()

# Close connection 
$connection.Close()


# Removing agent job ip address from sqlserver firewall rule
Write-Host " Remove agent job IP from SQL server firewall" - ForegroundColor Green 

Remove-AzSqlServerFirewallRule -FirewallRuleName $FirewallRuleName `
    -ResourceGroupName $artifactStorageResourceGroupName `
    -ServerName $sqlServerName 
Write-Output "Removed agent job ipaddress from sqlserver firewall rule "

# Add function app outbound ips to SQl server firewall rules 
$functionAppctx = Get-AzFunctionApp -ResourceGroupName $artifactStorageResourceGroupName -Name $functionAppName
$i = 0
foreach ($IPaddress in $functionAppctx.PossibleOutboundIPAddress.Split(",")) {
    # Name generation for firewall rule names 
    $i++
    $NewRule = "FunctionAppIP" + "$i"
    # Check if a rule with same name exists
    $rulecheck = (Get-AzSqlServerFirewallRule `
            -ResourceGroupName $artifactStorageResourceGroupName `
            -ServerName $sqlServerName `
            | Where-Object{$_.FirewallRuleName -eq $NewRule}).FirewallRuleName

    if ($null -eq $rulecheck) {
        Write-Output "add new firewallrule"
        # add if not exists
        New-AzSqlServerFirewallRule `
            -ResourceGroupName $artifactStorageResourceGroupName `
            -ServerName $sqlServerName `
            -FirewallRuleName $NewRule `
            -StartIpAddress $IPaddress `
            -EndIpAddress $IPaddress
    }
    elseif ( $rulecheck -eq $NewRule) {
        Write-Output "remove and add new firewallrule"
        # remove if exists with same name 
        Remove-AzSqlServerFirewallRule `
            -FirewallRuleName $NewRule `
            -ResourceGroupName $artifactStorageResourceGroupName `
            -ServerName $sqlServerName
        # add new firewall rules 
        New-AzSqlServerFirewallRule `
            -ResourceGroupName $artifactStorageResourceGroupName `
            -ServerName $sqlServerName `
            -FirewallRuleName $NewRule `
            -StartIpAddress $IPaddress `
            -EndIpAddress $IPaddress
    }
}


# Generating variables to be used in frontend code
$WebAppRegistration_AppId = (Get-AzADApplication -DisplayName $WebAppRegistration).AppId
$FunctionAppRegistration_AppId = (Get-AzADApplication -DisplayName $FunctionAppRegistration).AppId
$ScopeID = "api://" + $FunctionAppRegistration_AppId + "/User.Read"
$RedirectURI = "https://" + $FrontDoorEndpointHostname.HostName + "/dashboard"
$FunctionAppFQDN = $FrontDoorEndpointHostname.HostName

# Generating variables to be used in function app deployment Application settings task
$DatabaseName_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/DatabaseName/)"
$SqlServer_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/ServerName/)"
$SQLPassword_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/SQLPassword/)"
$SQLUser_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/SQLUser/)"
$FuncAppRegistrationSecretr_kvuri = "@Microsoft.KeyVault(SecretUri=https://" + $keyVaultName + ".vault.azure.net/secrets/FuncAppRegistrationSecret/)"

###############################################################################################
# passing few variables to be used in release pipeline
Write-Host "####vso[task.setvariable variable=ResourceGroupName;isoutput=true]$artifactStorageResourceGroupName"
Write-Host "####vso[task.setvariable variable=sqlServerName;isoutput=true]$sqlServerName"
Write-Host "####vso[task.setvariable variable=sqlDBName;isoutput=true]$sqlDBName"
Write-Host "####vso[task.setvariable variable=Database_SchemaName;isoutput=true]$DatabaseSchemaName"
Write-Host "####vso[task.setvariable variable=keyVaultName;isoutput=true]$keyVaultName"
Write-Host "####vso[task.setvariable variable=functionAppName;isoutput=true]$functionAppName"
Write-Host "####vso[task.setvariable variable=WebAppUIName;isoutput=true]$WebAppUIName"

# function app application settings 
Write-Host "####vso[task.setvariable variable=DatabaseName_kvuri;isoutput=true]$DatabaseName_kvuri"
Write-Host "####vso[task.setvariable variable=SqlServer_kvuri;isoutput=true]$SqlServer_kvuri"
Write-Host "####vso[task.setvariable variable=SQLPassword_kvuri;isoutput=true]$SQLPassword_kvuri"
Write-Host "####vso[task.setvariable variable=SQLUser_kvuri;isoutput=true]$SQLUser_kvuri"
Write-Host "####vso[task.setvariable variable=FuncAppRegistrationSecretr_kvuri;isoutput=true]$FuncAppRegistrationSecretr_kvuri"


Write-Host "####vso[task.setvariable variable=WebAppRegistration_AppId;isoutput=true]$WebAppRegistration_AppId"
Write-Host "####vso[task.setvariable variable=ScopeID;isoutput=true]$ScopeID"
Write-Host "####vso[task.setvariable variable=RedirectURI;isoutput=true]$RedirectURI"
Write-Host "####vso[task.setvariable variable=FunctionAppFQDN;isoutput=true]$FunctionAppFQDN"
Write-Host "####vso[task.setvariable variable=FunctionAppRegistration_AppId;isoutput=true]$FunctionAppRegistration_AppId"
