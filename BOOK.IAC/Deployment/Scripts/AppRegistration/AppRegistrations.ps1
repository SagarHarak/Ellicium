[CmdletBinding()]
param (
    [Parameter()]

    [string]$WebAppName,

    [string]$WebAppRegistration
)

################# Creating user app registration #############################################

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

$Approle = @{

    AllowedMemberType = "Application";
    Description = "User.ReadAll";
    DisplayName  = "Supplier";
    IsEnabled = $true;
    Id =New-Guid;
    Origin = "Application";
    Value = "User.ReadAll"
}

$WebApp_Name = (Get-AzADApplication -DisplayName $WebAppRegistration).DisplayName
Write-Host 'WebApp_Name' $WebApp_Name
if ($null -eq $WebApp_Name)
{
    $NewAzureWebApp = New-AzADApplication -DisplayName $WebAppRegistration -Api $APIparameters -OptionalClaim $Tokenconfig -AppRole $Approle
         Write-Host "Creating new user app reg" - ForegroundColor Green 
    # Create A service Principal for the above app Registration
    New-AzADServicePrincipal `
        -ApplicationId $NewAzureWebApp.AppId `
        -AppRoleAssignmentRequired
        
        Write-Host 'Create A service Principal for WebApp App registration'
        $IdentifierUri = "api://" + $NewAzureWebApp.AppId
        Update-AzADApplication -IdentifierUri $IdentifierUri -ApplicationId $NewAzureWebApp.AppId
}







