param(
    [string] $WorkspaceName ,
    [string] $PowerBI_embedded_name
 )

$WorkspaceID = ((Get-PowerBIWorkspace | Where-Object Name -eq $WorkspaceName).Id).Guid
$url = 'https://api.powerbi.com/v1.0/myorg/groups/'+$WorkspaceID+'/AssignToCapacity'

$capacityId = ((Get-PowerBICapacity | Where-Object{ $_.DisplayName -eq $PowerBI_embedded_name}).Id).Guid

$accessKey = Get-PowerBIAccessToken -AsString
# Authenticate to Power BI REST API
$headers = @{
    "Authorization" = $accessKey
    "Content-Type" = "application/json"
}

# Define the workspace to be assigned to the capacity
$body = @{
    "capacityId" = $capacityId
} | ConvertTo-Json

# Make the API call to assign the workspace to the capacity
Invoke-RestMethod -Method POST -Uri $url -Headers $headers -Body $body
Write-Host "Workspace is Assigned to Capacity"

