
# Creating App registration
$appName = "APINAME"
$SPARedirectUri = "http://localhost.com"
$ObjectId = "7de55075-81a8-4f3e-81fd-542a8c234a2e"
$MicrosoftGraphAppId = '00000003-0000-0000-c000-000000000000'

$myapp = Get-AzADApplication -DisplayName $appName 
Write-Host 'myapp' $myapp
if ($null -eq $myapp)
{
    $myApp = New-AzADApplication -DisplayName $appName -SPARedirectUri $SPARedirectUri
    Write-Host "Creating app registration " - ForegroundColor Green 
}

# Add-AzADAppPermission -ObjectId $ObjectId -ApiId $MicrosoftGraphAppId -PermissionId $UserRead -Type Scope

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
    Add-AzADAppPermission -ObjectId $ObjectId -ApiId $MicrosoftGraphAppId -PermissionId $id -Type Scope
}
# Adding API Application Permission Rule
$UserReadAll = "df021288-bdef-4463-88db-98f22de89214"
Add-AzADAppPermission -ObjectId $ObjectId -ApiId $MicrosoftGraphAppId -PermissionId $UserReadAll -Type Role
