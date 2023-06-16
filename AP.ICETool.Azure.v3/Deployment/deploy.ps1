Param(
    [string]$TenantId,

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

    [string] $DatabaseSchemaName,

    [ValidateSet("eastus", "eastus2", "centralus", "uksouth", "ukwest", "japaneast", "japanwest", "eastasia")]
    [string]$ResourceGroupLocation = "eastus2",

    [string] $departmentTag = "",

    [string] $budgetOwnerTag = "",

    [string] $productTag = "",

    [string[]]$allowedIpAddresses,

    [string]$deploymentPrincipalObjectId,

    [string]$ArtifactStorageContainerName = "storageartifacts",

    [string]$artifactStagingDirectory = ".",

    [string]$ApplicationReaderGroupId,

    [string]$productID,

    [string] $virtualNetworkIP = "10.0.0.0/22",
    [string] $VnetStartAddress = "10.0.0.0",
    [string] $VnetEndAddress = "10.0.3.255",
    [string] $subnet1IP = "10.0.1.0/24",

    [string] $PbiCapacityAdmin ,
    [string] $PowerBIEmbeddedSKU='A1',
    [string] $IsCapacityEnabled,
    [string] $CustomDomain="" ,
    [SecureString] $DevopsServicePrincipalClientSecret,
    

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
$vnetname = Build-ResourceName 1 "VNET" -lowerCase
$PowerBI_embedded_name = Build-ResourceName 1 "PBIEM" -lowerCase
$PowerBIWorkspaceName = Build-PowerBIWorkspaceName $ProjectCodeName $Environment
$sqladminLoginPassword = New-Password


# App Registrations
$WebAppRegistration = "appreg-" + $Appserviceuiname
$WebAppApiRegistration = 'appreg-' + $Appserviceapiname

$FirewallRulesArray =$allowedIpAddresses.replace(' ','').Split(",")
$CapacityAdmin = $PbiCapacityAdmin.replace(' ','').Split(",")
$CapacityAdmin = $CapacityAdmin + $deploymentPrincipalObjectId

$check_PBIEM = Get-AzResource  -Name $PowerBI_embedded_name -ResourceGroupName $artifactStorageResourceGroupName
if ( $null -ne $check_PBIEM) {
    $PBIEM_Status = (Get-AzPowerBIEmbeddedCapacity -Name $PowerBI_embedded_name).State
    if("Paused" -eq $PBIEM_Status){
        Resume-AzPowerBIEmbeddedCapacity -Name $PowerBI_embedded_name
        Write-Host "Started Power BI"
    }
    else{
        Write-Host "Power BI Capacity is already active"
        }
}
else{
    Write-Host "PowerBI does not exist"
}

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
    $templateParameters["vnetname"] = $vnetname
    $templateParameters["PowerBI_embedded_name"] = $PowerBI_embedded_name
    $templateParameters["CapacityMembers"] = $CapacityAdmin
    $templateParameters["PowerBI_embedded_sku"] = $PowerBIEmbeddedSKU
    $templateParameters["IsCapacityEnabled"] = $IsCapacityEnabled

    $templateParameters["virtualNetworkIP"] = $virtualNetworkIP
    $templateParameters["vnet_start_address"] = $VnetStartAddress
    $templateParameters["vnet_end_address"] = $VnetEndAddress
    $templateParameters["subnet1IP"] = $subnet1IP

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

########################################################################################################

# App Registration for PowerBI Authentication

try{
$PBIAppReg = .\scripts\WebApiAppRegistration\WebApiAppRegistration.ps1 `
                -PBIAppRegistration $WebAppApiRegistration
}
catch{
    throw $_
}

Write-Output "Generate Client Secret for PowerBI AppRegistration"
$StartDate = Get-Date
$EndDate = $StartDate.AddYears(1)
$AppRegSecretName = "ClientSecret_for_PowerBI_Integration"

$AppRegSecretName_check =( Get-AzADAppCredential -DisplayName $WebAppApiRegistration `
                                | Where-Object{ $_.DisplayName -eq $AppRegSecretName}).DisplayName

Write-Output "AppRegSecretName_check" $AppRegSecretName_check

$WebAppApiRegistrationObject = Get-AzADApplication -DisplayName $WebAppApiRegistration

if ( $null -eq $AppRegSecretName_check) {
    $PassWordCred_hash = @{
        DisplayName = $AppRegSecretName
        StartDateTime = $StartDate
        EndDateTime = $EndDate
    }
    # Generate Client Secret for App Registration 
    $WebAppApiRegistrationSecret = (New-AzADAppCredential `
                                    -ObjectId $WebAppApiRegistrationObject.Id `
                                    -PasswordCredentials $PassWordCred_hash).secretText
}
elseif ( $AppRegSecretName_check -eq $AppRegSecretName ) {
    # if appreg secret already exists, get it from keyvault
    $WebAppApiRegistrationSecret = Get-AzKeyVaultSecret `
                                    -VaultName $keyVaultName `
                                    -Name "WebappApiAuthClientSecret" `
                                    -AsPlainText
}
$WebAppApiRegistrationAppID = (Get-AzADApplication -DisplayName $WebAppApiRegistration).AppID

########################################################################################################
# App registration for WebApp Authentification 
Write-Host " App registration for WebApp Authentification" - ForegroundColor Green

# Get azure front door endpoint hostname to be passed into UI code while UI deployment
$FrontDoorEndpointHostname = Get-AzFrontDoorCdnEndpoint `
                                -EndpointName $FrontDoorName `
                                -ProfileName $FrontDoorName `
                                -ResourceGroupName $artifactStorageResourceGroupName

Write-Output "Azure front door Endpoint Hostname" $FrontDoorEndpointHostname.HostName
$env = $Environment.ToLower()
if((0 -eq $CustomDomain.Length) -or ("prod" -ne $env)){
    $SPA_Redirect_URI = 'https://' + $FrontDoorEndpointHostname.HostName
    # $SPA_Redirect_URI = 'https://'+ $Appserviceuiname +'.azurewebsites.net'
}
else{
    $SPA_Redirect_URI = 'https://' + $CustomDomain
}

$MicrosoftGraphAppId = '00000003-0000-0000-c000-000000000000'
$UserReadAllId = Find-MgGraphPermission User.Read.All -ExactMatch -PermissionType Application `
                 | Select-Object -ExpandProperty Id
$emailpermissionId  = Find-MgGraphPermission email -ExactMatch -PermissionType Delegated `
                | Select-Object -ExpandProperty Id
$profilepermissionId = Find-MgGraphPermission profile -ExactMatch -PermissionType Delegated `
                | Select-Object -ExpandProperty Id
$Offline_accesspermissionid = Find-MgGraphPermission offline_access -ExactMatch -PermissionType Delegated `
                | Select-Object -ExpandProperty Id
$OpenIdpermissionid = Find-MgGraphPermission openid -ExactMatch -PermissionType Delegated `
                | Select-Object -ExpandProperty Id
$UserReadpermissionid = Find-MgGraphPermission User.Read -ExactMatch -PermissionType Delegated `
                | Select-Object -ExpandProperty Id

$requiredAccess = @(
   @{
   ResourceAppId  = $MicrosoftGraphAppId
   ResourceAccess = @(
       @{
           Id   = $UserReadAllId
           Type = "Role"
       },
       @{
        Id   = $emailpermissionId
        Type = "Scope"
        },
        @{
            Id   = $profilepermissionId
            Type = "Scope"
        },
        @{
            Id   = $Offline_accesspermissionid
            Type = "Scope"
        },
        @{
            Id   = $OpenIdpermissionid
            Type = "Scope"
        },
        @{
            Id   = $UserReadpermissionid
            Type = "Scope"
        }  
      )
   }
)

$WebApp_Name = (Get-AzADApplication -DisplayName $WebAppRegistration).DisplayName
if ($null -eq $WebApp_Name ) {
    #Create Azure AD app Registration
    $AzureWebbAppObject = New-AzADApplication `
                            -DisplayName $WebAppRegistration `
                            -SPARedirectUri $SPA_Redirect_URI `
                            -RequiredResourceAccess $requiredAccess
    Write-Host "Web app registartion is done" -ForegroundColor Green

    # Create A service Principal for the above app Registration
    New-AzADServicePrincipal `
        -ApplicationId $AzureWebbAppObject.appId 
    Write-Host 'Create A service Principal for WebApp App registration' 
    
}

# Update Redirect Uri with friendly url
$WebAppRegistrationObjectID = (Get-AzADApplication -DisplayName $WebAppRegistration).ID
Update-AzADApplication `
    -ObjectId $WebAppRegistrationObjectID `
    -SPARedirectUri $SPA_Redirect_URI

# Add Application Reader group to enterprise application of Web App
$AddGroupWebappreg = Add-GroupToEnterpriseApplication $ApplicationReaderGroupId $WebAppRegistration

##########################################################################################################

# PowerBI login
$DevopsServicePrincipalAppId = (Get-AzADServicePrincipal -DisplayName $ADAdminName).AppId

$Credential = New-Object -TypeName System.Management.Automation.PSCredential `
            -ArgumentList $DevopsServicePrincipalAppId, $DevopsServicePrincipalClientSecret

Install-Module MicrosoftPowerBIMgmt -Force
Connect-PowerBIServiceAccount -Tenant $TenantId `
-ServicePrincipal -Credential (Get-Credential $Credential)
Write-Host "Devops Service Principal has successfully logged into power bi service"

########################################################################################################
# Create New workspace if does not exist

$check_workspace = Get-PowerBIWorkspace | Where-Object Name -eq $PowerBIWorkspaceName

if($null -eq $check_workspace){
New-PowerBIWorkspace -Name $PowerBIWorkspaceName
Write-Host "New Workspace created"
}
else{
    Write-Host "Worskspace already exist"
}

if("true" -eq $IsCapacityEnabled.ToLower()){
$AssignWorkspaceToCapacity = .\Scripts\PowerBI\AssignWorkspaceToCapacity.ps1 `
                            -WorkspaceName $PowerBIWorkspaceName `
                            -PowerBI_embedded_name $PowerBI_embedded_name
}
########################################################################################################

# Giving Member access to Web Api App Registration

$AddApiAppRegToWorkspace = .\Scripts\PowerBI\AddApiAppRegToWorkspace.ps1 `
                            -WorkspaceName $PowerBIWorkspaceName `
                            -WebApiAppReg $WebAppApiRegistration 

#####################################################################################################

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
    "SQLSchema" = $DatabaseSchemaName;
    "SQLPort"  = 1433;
    "ADLSName" = "ADLSName";
    "StorageAccountKey" = "StorageAccountKey";
    "TenantId" = $TenantId;
    "WebappApiAuthClientSecret" = $WebAppApiRegistrationSecret;
    "WebappApiAuthApplicationID" = $WebAppApiRegistrationAppID;
    "CurrentUserId" = "CurrentUserId";
    "CurrentUserEmail"= "CurrentUserEmail";
    "PBIAuthMode" = "ServicePrincipal";
    "AuthorityUrl" = "https://login.microsoftonline.com/";
    "PBIApiUrl" = "https://api.powerbi.com/";
    "PBIScopeBase" = "https://analysis.windows.net/powerbi/api/.default";
    "SQLSchemaIce" = "target"

}
foreach ($h in $hashtable.GetEnumerator() ) {

    Write-Host "$($h.Name)"
    $secretvalue = ConvertTo-SecureString $($h.Value) -AsPlainText -Force
    Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $($h.Name) -SecretValue $secretvalue
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

# #Create connection with the database
# $connectionString = "Data Source=$serverinstance;Initial Catalog=$sqlDBName;User ID=$Username;Password=$Password"
# $connection = New-Object -TypeName System.Data.SqlClient.SqlConnection($connectionString)
# $connection.Open()

# # create schemas
# $schemafile = ".\Scripts\SQlDatabase\DDL\DDL_schema.sql"
# $schema_object = (Get-Content -Path $schemafile -Raw)
# $create_schema = New-Object -TypeName System.Data.SqlClient.SqlCommand($schema_object, $connection)
# $create_schema.ExecuteNonQuery()
# Write-Host "Schema Created"

# # Remove FK if Exists
# $rmv_fk_file = ".\Scripts\SQlDatabase\DDL\RemoveFK.sql"
# $rmv_fk_object = (Get-Content -Path $rmv_fk_file -Raw) 
# $rmv_fk_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($rmv_fk_object, $connection)
# $rmv_fk_ddl.ExecuteNonQuery()
# Write-Host "Removed FK"

# ## Create tables 
# $create_table_file = ".\Scripts\SQlDatabase\DDL\DDL_tables.sql"
# $create_table_object = (Get-Content -Path $create_table_file -Raw)
# $create_table_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($create_table_object, $connection)
# $create_table_ddl.ExecuteNonQuery()
# Write-Host "Tables Created"

# ## drop index if exists 
# $drop_index_file = ".\Scripts\SQlDatabase\DDL\Drop_index.sql"
# $drop_index_object = (Get-Content -Path $drop_index_file -Raw)
# $drop_index_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($drop_index_object, $connection)
# $drop_index_ddl.ExecuteNonQuery()
# Write-Host "Index Droped"

# ## create index 
# $create_index_file = ".\Scripts\SQlDatabase\DDL\Create_index.sql"
# $create_index_object = (Get-Content -Path $create_index_file -Raw)
# $create_index_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($create_index_object, $connection)
# $create_index_ddl.ExecuteNonQuery()
# Write-Host "Index Created"

# ## drop Views
# $drop_views_file = ".\Scripts\SQlDatabase\DDL\Drop_view.sql"
# $drop_view_object = (Get-Content -Path $drop_views_file -Raw) 
# $drop_view_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($drop_view_object, $connection)
# $drop_view_ddl.ExecuteNonQuery()
# Write-Host "Views Dropped"

# ## Create views 
# $viewfiles = Get-ChildItem -Path '.\Scripts\SQlDatabase\DDL\DDL_view' `
#                 -filter DDL_views_*.sql -Recurse | ForEach-Object{$_.FullName}

# foreach ($viewfile in $viewfiles) {

#     $getviewcontent = (Get-Content -Path $viewfile -Raw) 
#     $command = New-Object -TypeName System.Data.SqlClient.SqlCommand($getviewcontent, $connection)
#     $command.CommandTimeout = 0;
#     $command.ExecuteNonQuery()

#     Write-Host "Viewfile, $viewfile" 
# }

# ## Create triggers if not exists
# $create_trigger_file = ".\Scripts\SQlDatabase\DDL\Create_trigger.sql"
# $add_trigger_object = (Get-Content -Path $create_trigger_file -Raw) 
# $create_trigger_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($add_trigger_object, $connection)
# $create_trigger_ddl.ExecuteNonQuery()
# Write-Host "Triggers Created"

# # # drop stored procedures 
# # $drop_SP_files = ".\Scripts\SQlDatabase\DDL\Drop_sp.sql"
# # $drop_SP_object = (Get-Content -Path $drop_SP_files -Raw) 
# # $drop_SP_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($drop_SP_object, $connection)
# # $drop_SP_ddl.ExecuteNonQuery()
# # Write-Host "Dropped SP"

# # # create procedure 
# # $spfiles = Get-ChildItem -Path '.\Scripts\SQlDatabase\DDL\DDL_SP' `
# #                 -filter DDL_SP*.sql -Recurse | ForEach-Object{$_.FullName}

# # foreach ($spfile in $spfiles) {

# #     $replaceschema = (Get-Content -Path $spfile -Raw) -replace $defaultschemaname, $schemaname
# #     $command = New-Object -TypeName System.Data.SqlClient.SqlCommand($replaceschema, $connection)
# #     $command.CommandTimeout = 0;
# #     $command.ExecuteNonQuery()

# #     Write-Host "SPfile, $spfile" 
# # }

# ## truncate static tables if exists 
# $truncate_table_file = ".\Scripts\SQlDatabase\DDL\Truncate_static_tables.sql"
# $truncate_table_object = (Get-Content -Path $truncate_table_file -Raw)
# $truncate_table_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($truncate_table_object, $connection)
# $truncate_table_ddl.ExecuteNonQuery()
# Write-Host "Truncated Static Tables"

# ## uploading Data 
# $tabledata = Get-ChildItem -Path '.\scripts\SQLDatabase\manual_tables' `
#                 -filter *.sql -Recurse | ForEach-Object{$_.FullName}
# foreach ($file in $tabledata) {

#     $replaceschema = (Get-Content -Path $file -Raw) 
#     $command = New-Object -TypeName System.Data.SqlClient.SqlCommand($replaceschema, $connection)
#     $command.CommandTimeout = 0;
#     $command.ExecuteNonQuery()

#     Write-Host "MannualTablesfile : $file"
# }

# # ## Update database with latest changes
# # $add_fk_file = ".\Scripts\SQlDatabase\DDL\Latest_SQL_updates.sql"
# # $add_fk_object = (Get-Content -Path $add_fk_file -Raw) 
# # $add_fk_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($add_fk_object, $connection)
# # $add_fk_ddl.ExecuteNonQuery()
# # Write-Host "Updated database with latest changes"

# # ## Update database with latest changes
# # $add_fk_file1 = ".\Scripts\SQlDatabase\DDL\Latest_SQL_updates1.sql"
# # $add_fk_object1 = (Get-Content -Path $add_fk_file1 -Raw) 
# # $add_fk_ddl1 = New-Object -TypeName System.Data.SqlClient.SqlCommand($add_fk_object1, $connection)
# # $add_fk_ddl1.ExecuteNonQuery()
# # Write-Host "Updated database with latest changes1"

# ## add foreign key constraints
# $add_fk_file = ".\Scripts\SQlDatabase\DDL\AddFK.sql"
# $add_fk_object = (Get-Content -Path $add_fk_file -Raw) 
# $add_fk_ddl = New-Object -TypeName System.Data.SqlClient.SqlCommand($add_fk_object, $connection)
# $add_fk_ddl.ExecuteNonQuery()
# Write-Host "Added FK constarints"

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
$env = $Environment.ToLower()
if((0 -eq $CustomDomain.Length) -or ("prod" -ne $env)){
    $WebAppApiUrl = 'https://' + $FrontDoorEndpointHostname.HostName +"/api"
    $AuthRedirectUri = 'https://' + $FrontDoorEndpointHostname.HostName
}
else{
    $WebAppApiUrl = 'https://' + $CustomDomain +"/api"
    $AuthRedirectUri = 'https://' + $CustomDomain
}
$Authority = 'https://login.microsoftonline.com/'+ $TenantId
$SCOPES = "user.read"
$WebAppRegistrationAppID =  (Get-AzADApplication -DisplayName $WebAppRegistration).AppID

###############################################################################################
# passing few variables to be used in release pipeline
Write-Host "####vso[task.setvariable variable=keyVaultName;isoutput=true]$keyVaultName"
Write-Host "####vso[task.setvariable variable=Appserviceuiname;isoutput=true]$Appserviceuiname"
Write-Host "####vso[task.setvariable variable=Appserviceapiname;isoutput=true]$Appserviceapiname"
Write-Host "####vso[task.setvariable variable=sqlServerName;isoutput=true]$sqlServerName"
Write-Host "####vso[task.setvariable variable=ResourceGroupName;isoutput=true]$artifactStorageResourceGroupName"



# variables used when replacing tokens for frontend deployment
Write-Host "####vso[task.setvariable variable=WebAppApiUrl;isoutput=true]$WebAppApiUrl"
Write-Host "####vso[task.setvariable variable=Authority;isoutput=true]$Authority"
Write-Host "####vso[task.setvariable variable=AuthRedirectUri;isoutput=true]$AuthRedirectUri"
Write-Host "####vso[task.setvariable variable=WebAppRegistrationAppID;isoutput=true]$WebAppRegistrationAppID"
Write-Host "####vso[task.setvariable variable=SCOPES;isoutput=true]$SCOPES"


