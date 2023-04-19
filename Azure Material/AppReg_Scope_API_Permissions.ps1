#############Setting up variables#########################

$Location = "eastus2"
$ResourceGroupName = "EL-AZ-TESTING"
# $StorageAccountName = "eluse2funcsta"
# $pythonVersion = "3.9"
# $functionsVersion = "4"

# #Adding tags
# $CreatedBy = "Sagar Harak"
# $CreatedAt = "27/02/2023"

# $tags = @{
#     "CreatedBy" = $CreatedBy
#     "CreatedAt" = $CreatedAt
# }

# #############Creating storage account for function app###################

# $mystorage = Get-AzStorageAccount -ResourceGroupName $ResourceGroupName -Name $StorageAccountName
# Write-Host 'mystorage' $mystorage
# if ($null -eq $mystorage)
# {
#     $mystorage = New-AzStorageAccount -ResourceGroupName $ResourceGroupName `
#                 -Name $StorageAccountName `
#                 -Location $Location `
#                 -SkuName Standard_LRS `
#                 -EnableHierarchicalNamespace $true `
#                 -Tag $tags `
#                 -Kind StorageV2 
#             Write-Host "Creating new storage account" - ForegroundColor Green 
# }

# #############Creating function app for python###################

# $funcappName = "eluse2funcapptesting"

# $myapp = Get-AzFunctionApp -ResourceGroupName $ResourceGroupName -Name $funcappName 
# Write-Host 'myapp' $myapp
# if ($null -eq $myapp)
# {     
#     $myapp = New-AzFunctionApp -ResourceGroupName $ResourceGroupName `
#             -Name $funcappName `
#             -Location $Location `
#             -StorageAccountName $StorageAccountName `
#             -Runtime Python `
#             -DisableApplicationInsights `
#             -OSTyp Linux `
#             -RuntimeVersion 3.9 `
#             -FunctionsVersion 4 
#         Write-Host "Creating new function app" - ForegroundColor Green 
# }

# ############Creating user app registration#############################################

# $ObjectId = "f0f89807-3aa0-45f2-a6a3-3cec4a76cffd"
$Appregname = "eluse2appreg"

$myregapp = Get-AzADApplication -DisplayName $Appregname
Write-Host 'myregapp' $myregapp

$Approle = @{

    AllowedMemberType = "Application";
    Description = "User.Read";
    DisplayName  = "User.Read";
    IsEnabled = $true;
    Id =New-Guid;
  # Type = "User";
    Origin = "Application";
    Value = "User.Read"
}
if ($null -eq $myregapp)
{
    $myregApp = New-AzADApplication -DisplayName $Appregname -AppRole $Approle 
         Write-Host "Creating new app reg" - ForegroundColor Green 
 }


# Create A service Principal for the above app Registration
New-AzADServicePrincipal `
-ApplicationId $myregApp.appId 
Write-Host 'Create A service Principal ' 
$IdentifierUri = "api://" + $myregApp.AppId
Update-AzADApplication -IdentifierUri $IdentifierUri -ApplicationId $myregApp.AppId


################# Creating client app registration #############################################
$ApiId = "7864cd0c-7aac-4925-8021-4c9212c203a3"
$appregclient = "eluse2client"
$APIparameters = @{

    Oauth2PermissionScope = @(
 
       @{
 
          AdminConsentDescription = "Admin User.Read for ";
          AdminConsentDisplayName = "User.Read";
          IsEnabled = $true;
          Id =New-Guid;
          Type = "User";
          UserConsentDescription = "User User.Read for ";
          UserConsentDisplayName = "User.Read";
          Value = "User.Read"
        }
 
    )  
 }
 
$Tokenconfig = @{
    AccessToken  = @(
        @{
           Name = 'aud'
        }
     )
}

$myclientapp = Get-AzADApplication -DisplayName $appregclient
Write-Host 'myclientapp' $myclientapp
if ($null -eq $myclientapp)
{
    $myclientapp = New-AzADApplication -DisplayName $appregclient -Api $APIparameters -OptionalClaim $Tokenconfig
         Write-Host "Creating new client app reg" - ForegroundColor Green 
}

# Create A service Principal for the above app Registration
New-AzADServicePrincipal `
     -ApplicationId $myclientapp.AppId
Write-Host 'Create A service Principal for WebApp App registration'
$IdentifierUri = "api://" + $myclientapp.AppId
Update-AzADApplication -IdentifierUri $IdentifierUri -ApplicationId $myclientapp.AppId

# # Adding API permisson from my API
$PermissionId = "df021288-bdef-4463-88db-98f22de89214"
$ApiId = "00000003-0000-0000-c000-000000000000"
# Add-AzADAppPermission -ApplicationId $myclientapp.AppId -PermissionId $PermissionId -Type Role
Add-AzADAppPermission -ApiId $ApiId -ApplicationId $myclientapp.AppId -PermissionId $PermissionId -Type Role


# # Generate Client Secret for App Registration and set expiry date for secret
$endDate = [System.DateTime]::Now.AddYears(1)
$AzureApplicationSecret = New-AzADAppCredential -ApplicationId $myclientapp.AppId -EndDate $endDate

  # Convert plain text password to a secure string
$clientSecretValue = ConvertTo-SecureString $AzureApplicationSecret.secretText -AsPlainText -Force

# # Creating new keyvault
$keyVaultName = "eluse2funckeyvault13"
$secretname = "ClientSecret13"
$Location = "eastus2"
$ResourceGroupName = "EL-AZ-TESTING"
New-AzKeyVault -Name $keyVaultName -ResourceGroupName $ResourceGroupName -Location $Location
Write-Host 'Creating keyvault'

# # Storing Secret in Key Vault
Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $secretname -SecretValue $clientSecretValue

# # getting existing key vault secrets 
$secret_name = (Get-AzKeyVaultSecret -VaultName $keyVaultName)
$secretvalue = ConvertTo-SecureString -AsPlainText -Force
Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $secretname -SecretValue $secretvalue

# $secretvalue = "0wJ8Q~gpWy7jOYqvBbtocrg4ta5gVQwBux8JUbYn"
# $ApplicationId = "1e9afec9-27d7-4deb-bf0b-1f20a844cc6e"




###################################################################################################

