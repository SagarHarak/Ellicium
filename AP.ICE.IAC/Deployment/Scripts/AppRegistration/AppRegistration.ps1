

[CmdletBinding()]
param (
    [Parameter()]
    [string]$functionAppName,

    [string]$FunctionAppRegistration,

    [string]$WebAppUIName,

    [string]$WebAppRegistration
)

Write-Host "Creating Function App Registration..." -ForegroundColor Green

# Setup MS Graph User.Read Required Access for function App
Write-Host "Setup  User.Read permission " -ForegroundColor Blue
$scopeId_UserRead = Find-MgGraphPermission User.Read -ExactMatch -PermissionType Delegated | Select-Object -ExpandProperty Id
$Func_requiredAccess_hash = @(
    @{
        ResourceAppId  = "00000003-0000-0000-c000-000000000000"
        ResourceAccess = @(
            @{
                Id   = $scopeId_UserRead
                Type = "Scope"
            }
        )
    }
)

$FuncAppReg_redirect_uri = "https://" + $functionAppName + ".azurewebsites.net"

$Func_web_hash = @{
    redirectUris = @($FuncAppReg_redirect_uri)
    implicitGrantSettings = @{
        enableAccessTokenIssuance = "True"
        enableIdTokenIssuance = "True"
        }
}

$optionalClaim_hash = @{
    AccessToken = @(
        @{
            Name = "aud"
        }
    )
}


$FunctionAppRegistration_Check = Get-AzADApplication -DisplayName $FunctionAppRegistration

if ( $null -eq $FunctionAppRegistration_Check.DisplayName) {

    # Create function app registration if it doesnt exists

    $FuncApiOauth2PermissionScope_ID = New-Guid
    $Func_Api_hash = @{
        Oauth2PermissionScope = @(
            @{
                AdminConsentDescription = "Admin User.Read for $($functionAppName)"
                Id                      = $FuncApiOauth2PermissionScope_ID
                AdminConsentDisplayName = "User.Read"
                IsEnabled               = $true        
                Type                    = "User"
                UserConsentDescription  = "User User.Read for $($functionAppName)"
                UserConsentDisplayName  = "User.Read"
                Value                   = "User.Read"
            }
        )
    }

    $newFunctionAppRegistration = New-AzADApplication `
                                    -DisplayName $FunctionAppRegistration `
                                    -SignInAudience "AzureADMyOrg" `
                                    -Web $Func_web_hash `
                                    -OptionalClaim $optionalClaim_hash `
                                    -RequiredResourceAccess $Func_requiredAccess_hash `
                                    -Api $Func_Api_hash

    # Create A service Principal for the above app Registration
    New-AzADServicePrincipal `
        -ApplicationId $newFunctionAppRegistration.AppId `
        -AppRoleAssignmentRequired

    $FuncIdentifierUri = "api://" + $newFunctionAppRegistration.AppId 
    
    #add identifier URI in Expose an API
    Update-AzADApplication `
        -ObjectId $newFunctionAppRegistration.Id `
        -IdentifierUri $FuncIdentifierUri
}
    

###########################################################################################
Write-Host "Creating Web UI App Registration for ..." -ForegroundColor Green

$webSPARedirectUri = "https://" + $WebAppUIName + ".azurewebsites.net/dashboard"

$WebAppRegistration_Check = Get-AzADApplication -DisplayName $WebAppRegistration

$WebApp_web_hash = @{
    implicitGrantSettings = @{
        enableAccessTokenIssuance = "True"
        enableIdTokenIssuance = "True"
        }
}

# Create web app registration if it doesnt exists
if ( $null -eq $WebAppRegistration_Check.DisplayName) {

    # Setup MS Graph User.Read and function app custom api Required Access for Web App
    $WebApp_requiredAccess_hash = @(
        @{
            ResourceAppId  = "00000003-0000-0000-c000-000000000000"
            ResourceAccess = @(
                @{
                    Id   = $scopeId_UserRead
                    Type = "Scope"
                }
            )
        },
        @{
            ResourceAppId  = $newFunctionAppRegistration.AppId
            ResourceAccess = @(
                @{
                    Id   =  $FuncApiOauth2PermissionScope_ID
                    Type = "Scope"
                }
            )
        }
    )

    $newWebAppRegistration = New-AzADApplication `
                                -DisplayName $WebAppRegistration `
                                -SignInAudience "AzureADMyOrg" `
                                -Web $WebApp_web_hash `
                                -OptionalClaim $optionalClaim_hash `
                                -SPARedirectUri $webSPARedirectUri `
                                -RequiredResourceAccess $WebApp_requiredAccess_hash 

    # Create A service Principal for the above app Registration
    New-AzADServicePrincipal `
        -ApplicationId $newWebAppRegistration.AppId `
        -AppRoleAssignmentRequired
}