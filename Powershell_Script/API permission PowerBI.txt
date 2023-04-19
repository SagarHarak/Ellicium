# Adding API Delegated permission rule
$ObjectId = "b3cce3bc-1cb9-4fc9-96c8-3ed4e466da5a"
$Powerbi = "00000009-0000-0000-c000-000000000000"
# $Dashboard.Read.All = "f9759906-80a4-4f4a-b010-24b832bc6a30"
# $Dataflow.Read.All = "2448370f-f988-42cd-909c-6528efd67c1a"
# $Dataset.Read.All = "7f33e027-4039-419b-938e-2f8ca153e68e"
# $Report.Read.All = "4ae1bf56-f562-4747-b7bc-2fa0874ed46f"
# $Workspace.Read.All = "b2f1b2fa-f35c-407c-979c-a858a808ba85"

$PermissionId = @(
    "f9759906-80a4-4f4a-b010-24b832bc6a30",
    "2448370f-f988-42cd-909c-6528efd67c1a",
    "7f33e027-4039-419b-938e-2f8ca153e68e",
    "4ae1bf56-f562-4747-b7bc-2fa0874ed46f",
    "b2f1b2fa-f35c-407c-979c-a858a808ba85"
)
foreach($id in $PermissionId){
    Write-Host $id
$delegatedapi = (Get-AzADAppPermission -ObjectId $ObjectId `
                           | Where-Object {$_.Id -eq $id}).Id.Guid
if ($null -eq $delegatedapi){
    Add-AzADAppPermission -ObjectId $ObjectId -ApiId $Powerbi -PermissionId $id -Type Scope }
}