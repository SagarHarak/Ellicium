
$Appregname = "eluse2userappreg"
$appRoleName = "Manufacturer"

# Getting the app registration
$appRegistration = Get-AzADApplication -DisplayName $Appregname

# Checking if the app role already exists
$existingAppRole = $appRegistration.AppRole | Where-Object { $_.DisplayName -eq $appRoleName }

if ($existingAppRole -eq $null) {
    # Create a new app role
$newAppRole = @{
    AllowedMemberType = "Application";
    Description = "Manufacturer";
    DisplayName  = "Manufacturer";
    IsEnabled = $true;
    Id =New-Guid;
    Origin = "Application";
    Value = "Manufacturer"
}
    # Add the new app role to the app registration
    Update-AzADApplication -ObjectId $appRegistration.Id -AppRole $newAppRole

    Write-Host "New App role '$appRoleName' added successfully."
} 
else {
    Write-Host "App role '$appRoleName' already exists."
}