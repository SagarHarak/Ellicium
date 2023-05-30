$EnterpriseApplicationName = "eluse2userappreg"
$GroupId = "807e18e3-b4a1-4018-b15c-09f2d3f279b1"
$Appregname = "eluse2userappreg"
$Approlename = "Manufacturer"

Connect-MgGraph

function Add-GroupToEnterpriseApplication ([string]$GroupId, [string]$EnterpriseApplicationName) {

    $EntApp_Id = (Get-MgServicePrincipal -Filter "DisplayName eq '$EnterpriseApplicationName'").Id
    $EntAppGroupAssigncheck = (Get-MgServicePrincipalAppRoleAssignedTo `
                                -ServicePrincipalId $EntApp_Id| Where-Object PrincipalId -eq $GroupId).PrincipalId

    Write-Host "EntAppGroupAssigncheck : " $EntAppGroupAssigncheck

# Get the app registration
$appRegistration = Get-AzADApplication -DisplayName $Appregname

# Get the app role ID
$AppRoleId = ($appRegistration.AppRole | Where-Object {$_.DisplayName -eq $Approlename}).Id

# Display the app role ID
Write-Host "App Role ID: $AppRoleId"

    # if not added, add group to enterprise application 
    if ( $null -eq $EntAppGroupAssigncheck ) {
        $webAppRoleAssignment = @{
            PrincipalId = $GroupId
            ResourceId  = $EntApp_Id
            AppRoleId   = $AppRoleId
        }
        $webGroupAssign = New-MgGroupAppRoleAssignment -GroupId $GroupId -BodyParameter $webAppRoleAssignment

        Write-Host " Group $GroupId added in $EnterpriseApplicationName"
    }
    else {
        Write-Host " Group $GroupId already added to $EnterpriseApplicationName"
    }
}

Add-GroupToEnterpriseApplication 807e18e3-b4a1-4018-b15c-09f2d3f279b1 eluse2userappreg

