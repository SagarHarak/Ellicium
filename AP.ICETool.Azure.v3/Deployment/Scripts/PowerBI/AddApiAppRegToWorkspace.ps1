param(
    [string] $WorkspaceName ,
    [string] $WebApiAppReg 
 )

$WorkspaceID = ((Get-PowerBIWorkspace | Where-Object Name -eq $WorkspaceName).Id).Guid
$accessKey = Get-PowerBIAccessToken -AsString
# Authenticate to Power BI REST API
$headers = @{
    "Authorization" = $accessKey
    "Content-Type" = "application/json"
}

$WebApiAppRegSPID = (Get-AzADServicePrincipal -DisplayName $WebApiAppReg).Id

$userPBIurl = 'https://api.powerbi.com/v1.0/myorg/groups/'+$WorkspaceID+'/users'
$userPBIbody =@{
"identifier"= $WebApiAppRegSPID
"groupUserAccessRight"= "Member"
"principalType"= "App"
 } | ConvertTo-Json

 $GetWorkspaceUser = (Invoke-RestMethod -Method GET -Uri $userPBIurl -Headers $headers).value
 $check_workspaceUser = $GetWorkspaceUser | Where-Object { $_.displayName -eq $WebApiAppReg }

if ($null -eq $check_workspaceUser){
 Invoke-RestMethod -Method POST -Uri $userPBIurl -Headers $headers -Body $userPBIbody
 Write-Host "Web Api App Registration is added to Workspace as Member"
}
else{
    Write-Host "Web Api App Registration is already added in workspace"
}
