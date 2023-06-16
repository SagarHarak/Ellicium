param(
    [Parameter()]
    [string] $PBIAppRegistration

)

# App registration for PowerBI Authentification 
Write-Host " App registration for PowerBI Authentification" - ForegroundColor Green

$PBIApp_Name = (Get-AzADApplication -DisplayName $PBIAppRegistration).DisplayName
if ($null -eq $PBIApp_Name ) {
    #Create Azure AD app Registration
    $AzurePBIAppObject = New-AzADApplication `
                            -DisplayName $PBIAppRegistration 

    # Create A service Principal for the above app Registration
    New-AzADServicePrincipal `
        -ApplicationId $AzurePBIAppObject.appId 
    Write-Host 'Create A service Principal for PowerBI App registration' 
    
}

$PBIAppRegistrationObjectID = (Get-AzADApplication -DisplayName $PBIAppRegistration).ID

# Add user.read.all , email , profile (Application)  api permission to above created app 
Write-Host "`nStep 04 : Add api permission to above created app" - ForegroundColor Green 

$MicrosoftGraphAppId = '00000003-0000-0000-c000-000000000000'
$PowerBIServiceAppId='00000009-0000-0000-c000-000000000000'
# Adding API Delegated permission rule
$PBIServicePermissionId = @(
    "f9759906-80a4-4f4a-b010-24b832bc6a30",
    "2448370f-f988-42cd-909c-6528efd67c1a",
    "7f33e027-4039-419b-938e-2f8ca153e68e",
    "4ae1bf56-f562-4747-b7bc-2fa0874ed46f",
    "b2f1b2fa-f35c-407c-979c-a858a808ba85"
   
)
foreach($id in $PBIServicePermissionId){
    Write-Host $id
$apidelegate = (Get-AzADAppPermission -ObjectId $PBIAppRegistrationObjectID `
                           | Where-Object {$_.Id -eq $id}).Id.Guid
if ($null -eq $apidelegate){
    Add-AzADAppPermission -ObjectId $PBIAppRegistrationObjectID -ApiId $PowerBIServiceAppId -PermissionId $id -Type Scope }
}

$PermissionId = @(
    "e1fe6dd8-ba31-4d61-89e7-88639da4683d"
   
)
foreach($id in $PermissionId){
    Write-Host $id
$apidelegate = (Get-AzADAppPermission -ObjectId $PBIAppRegistrationObjectID `
                           | Where-Object {$_.Id -eq $id}).Id.Guid
if ($null -eq $apidelegate){
    Add-AzADAppPermission -ObjectId $PBIAppRegistrationObjectID -ApiId $MicrosoftGraphAppId -PermissionId $id -Type Scope }
}

