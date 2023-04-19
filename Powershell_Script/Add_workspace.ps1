# Assign Workspace to Capacity
$TenantId = "756e24a1-ea84-4a3f-a500-10aea6da0d65"
$ADAdminName = "DevopsServiceConnection"
$ClientSecret = "1BF8Q~6A5ZpmXvxrRRb2W745dfhf3qOHpBI2idxM"

$DevopsServicePrincipalAppId = (Get-AzADServicePrincipal -DisplayName $ADAdminName).AppId
Write-Host "DevopsServicePrincipalAppId" $DevopsServicePrincipalAppId
$DevopsServicePrincipalClientSecret = ConvertTo-SecureString $ClientSecret -AsPlainText -Force

$Credential = New-Object -TypeName System.Management.Automation.PSCredential `
             -ArgumentList $DevopsServicePrincipalAppId, $DevopsServicePrincipalClientSecret

Install-Module MicrosoftPowerBIMgmt -Force
# Install-Module -Name newtonsoft.json -AllowClobber
Connect-PowerBIServiceAccount -Tenant $TenantId -ServicePrincipal -Credential (Get-Credential $Credential)
Write-Host "Devops Service Principal has successfully log into power bi service"


# Create New workspace if does not exist
$PowerBIWorkspaceName = "ENG-PRIME-DEV"
$PowerBI_embedded_name = "PBIEM"
$Environment = "dev"

$check_workspace = Get-PowerBIWorkspace | Where-Object Name -eq $PowerBIWorkspaceName

if($null -eq $check_workspace){
New-PowerBIWorkspace -Name $PowerBIWorkspaceName
Write-Host "New Workspace created"
}
else{
    Write-Host "Worskspace already exist"
}