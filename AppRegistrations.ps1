

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
# $ApiId = "7864cd0c-7aac-4925-8021-4c9212c203a3"
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
$PermissionId = "02d7a037-ce47-41a9-8c76-9c82d5a698d0" #User.ReadAll permission id
$ApiId = "21cc5313-7a99-4062-823a-4b38c02f1d47" #user app registration clientid

# Add-AzADAppPermission -ApplicationId $myclientapp.AppId -PermissionId $PermissionId -Type Role
Add-AzADAppPermission -ApiId $ApiId -ApplicationId $myclientapp.AppId -PermissionId $PermissionId -Type Role


# # Generate Client Secret for App Registration and set expiry date for secret
$endDate = [System.DateTime]::Now.AddYears(1)
$AzureApplicationSecret = New-AzADAppCredential -ApplicationId $myclientapp.AppId -EndDate $endDate

# # Creating new keyvault account
$keyVaultName = "eluse2funckeyvault13"
$secretname = "ClientSecret13"
$Location = "eastus2"
$ResourceGroupName = "EL-AZ-TESTING"
$CosmosDbName = "eluse2bookcosmosdb"

# $CosmosDbAccountValue = "https://" + $CosmosDbName + ".documents.azure.com:443/"

New-AzKeyVault -Name $keyVaultName -ResourceGroupName $ResourceGroupName -Location $Location
Write-Host 'Creating keyvault'

# Get read-write key for the Cosmos DB account
$CosmosDBAccountKeys = Get-AzCosmosDBAccountKey -ResourceGroupName $resourceGroupName -Name $accountName -Type "Read-write Keys"

# Convert the Primary key to a SecureString
$clientSecretValue = ConvertTo-SecureString $AzureApplicationSecret.secretText -AsPlainText -Force
$CosmosDbkeySecretValue = ConvertTo-SecureString -String $CosmosDBAccountKeys.PrimaryMasterKey -AsPlainText -Force

# # Storing Secrets in Key Vault
Set-AzKeyVaultSecret -VaultName $keyVaultName -Name "Clientappreg" -SecretValue $clientSecretValue
Set-AzKeyVaultSecret -VaultName $keyVaultName -Name "CosmosDbkey" -SecretValue $CosmosDbkeySecretValue



###################################################################################################

