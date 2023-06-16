# Install the module. This step requires you to be an administrator on your machine.
Install-Module AzureAD
# Your tenant ID (in the Azure portal, under Azure Active Directory > Overview).
$tenantID = '756e24a1-ea84-4a3f-a500-10aea6da0d65'

# The name of your web app, which has a managed identity that should be assigned to the server app's app role.
$webAppName = 'eluse2gtoprimefa01'
$resourceGroupName = 'gto-rg-dev-s2'

# The name of the server app that exposes the app role.
$serverApplicationName = 'eluse2client' # For example, MyApi

# The name of the app role that the managed identity should be assigned to.
$appRoleName = 'Manufacturer' # For example, MyApi.Read.All

# Look up the web app's managed identity's object ID.
$managedIdentityObjectId = (Get-AzWebApp -ResourceGroupName $resourceGroupName -Name $webAppName).identity.principalid

Connect-AzureAD -TenantId $tenantID
# Look up the details about the server app's service principal and app role.
$serverServicePrincipal = (Get-AzureADServicePrincipal -Filter "DisplayName eq '$serverApplicationName'")
$serverServicePrincipalObjectId = $serverServicePrincipal.ObjectId
# $AppRoleId = ($serverServicePrincipal.AppRole | Where-Object {$_.DisplayName -eq $appRoleName}).Id
$AppRoleId = "0ca3ca3f-b472-47d6-a018-49947ad1784b"
# Assign the managed identity access to the app role.
New-AzureADServiceAppRoleAssignment `
    -ObjectId $managedIdentityObjectId `
    -Id $AppRoleId `
    -PrincipalId $managedIdentityObjectId `
    -ResourceId $serverServicePrincipalObjectId