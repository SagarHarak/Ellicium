################# Creating client app registration #############################################

$appregclient = "eluse2client"  #client app registration name

$APIparameters = @{

   Oauth2PermissionScope = @(
 
      @{
 
         AdminConsentDescription = "Admin User.Read for ";
         AdminConsentDisplayName = "User.Read";
         IsEnabled               = $true;
         Id                      = New-Guid;
         Type                    = "User";
         UserConsentDescription  = "User User.Read for ";
         UserConsentDisplayName  = "User.Read";
         Value                   = "User.Read"
      }
 
   )  
}

$myclientapp = Get-AzADApplication -DisplayName $appregclient
Write-Host 'myclientapp' $myclientapp
if ($null -eq $myclientapp) {
   $myclientapp = New-AzADApplication -DisplayName $appregclient -Api $APIparameters
   Write-Host "Creating new client app reg" - ForegroundColor Green 
}

# Create A service Principal for the above app Registration
New-AzADServicePrincipal `
   -ApplicationId $myclientapp.AppId
Write-Host 'Create A service Principal for WebApp App registration'
$IdentifierUri = "api://" + $myclientapp.AppId
Update-AzADApplication -IdentifierUri $IdentifierUri -ApplicationId $myclientapp.AppId

# Setting API permissions in client app registration
$PermissionId = "02d7a037-ce47-41a9-8c76-9c82d5a698d0" #User.ReadAll permission id
$ApiId = "21cc5313-7a99-4062-823a-4b38c02f1d47" #userclientid app registration

# Add API permission from my APIs
Add-AzADAppPermission -ApiId $ApiId -ApplicationId $myclientapp.AppId -PermissionId $PermissionId -Type Role

# # Generate Client Secret for App Registration and set expiry date for secret
$endDate = [System.DateTime]::Now.AddYears(1)

$PassWordCred_hash = @{
   DisplayName   = "ClientAppRegSecretName"
   StartDateTime = $StartDate
   EndDateTime   = $EndDate
}


$AzureApplicationSecret = (New-AzADAppCredential `
      -ApplicationId $myclientapp.AppId `
      -EndDate $endDate `
      -PasswordCredentials $PassWordCred_hash).secretText

