function Assign-AppRoleToManagedIdentity {
    param (
        [string]$WebAppName,
        [string]$ServerApplicationName,
        [string]$AppRoleName
    )

    # Look up the web app's managed identity's object ID
    $managedIdentityObjectId = (Get-AzWebApp -Name $WebAppName).identity.principalid

    # Look up the details about the server app's service principal and app role
    $serverServicePrincipal = (Get-MgServicePrincipal -Filter "DisplayName eq '$ServerApplicationName'")
    $serverServicePrincipalObjectId = $serverServicePrincipal.Id
    $AppRoleId = ($serverServicePrincipal.AppRoles | Where-Object { $_.DisplayName -eq $AppRoleName }).Id

    # Check if the app role is already assigned
    $existingAppRole = Get-MgServicePrincipalAppRoleAssignedTo -ServicePrincipalId $serverServicePrincipalObjectId | Where-Object { $_.AppRoleId -eq $AppRoleId }

    if ($existingAppRole) {
        Write-Output "The app role already exists."
    }
    else {
        # Assign the managed identity access to the app role
        New-MgServicePrincipalAppRoleAssignment `
            -ServicePrincipalId $managedIdentityObjectId `
            -PrincipalId $managedIdentityObjectId `
            -ResourceId $serverServicePrincipalObjectId `
            -AppRoleId $AppRoleId
        Write-Output "The app role has been added to the enterprise application."
    }
}

# Assign AppRole
Assign-AppRoleToManagedIdentity `
    -TenantId '756e24a1-ea84-4a3f-a500-10aea6da0d65' `
    -WebAppName 'eluse2gtoprimefa01' `
    -ServerApplicationName 'eluse2client' `
    -AppRoleName 'Manufacturer'
