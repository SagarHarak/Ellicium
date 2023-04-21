param(
    [Parameter(Mandatory = $false)]
    [string] $TenantId = "756e24a1-ea84-4a3f-a500-10aea6da0d65",

    [Parameter(Mandatory = $false)]
    [string] $ParentOu = "OU=Projects,OU=ETS-Azure,OU=AzureObjects,DC=OneFirm,DC=corp",

    [Parameter(Mandatory = $true)]
    [ValidateLength(3, 10)]
    [string] $ProjectCodeName,
	
    [Parameter(Mandatory = $true)]
    [string] $ETSProjectID,

    [bool]$developerGroup = $true,
    [bool]$tableauGroups = $true,
    [bool]$devOpsGroup = $true
)

$ErrorActionPreference = 'Stop'

#Setup functions
function Create-ADOrganizationalUnit ([string]$ouName) {
    
    $existingOU = Get-ADOrganizationalUnit -Filter "Name -like '$ouName'"

    if ($existingOU) {
        Write-Host "Primary OU exists, checking for Groups OU..."
        $existingGroupOU = Get-ADOrganizationalUnit -SearchBase $existingOU.distinguishedName -Filter "Name -like 'Groups'" -SearchScope OneLevel
        if ($existingGroupOU) {
            $groupOu = $existingGroupOU.distinguishedName

            Write-Host "here: $groupOu"
        }
        else {
            $newGroupOu = New-ADOrganizationalUnit -Name "Groups" -Path $existingOU.distinguishedName
            $groupOu = $newGroupOu.distinguishedName
            Write-Host "here2: $groupOu"
        }
    }
    else {
    
        $newOU = New-ADOrganizationalUnit -Name $ouName -Path $parentOU
        $groupOuPath = Get-ADOrganizationalUnit -Filter "Name -like '$ouName'"
        $newGroupOU = New-ADOrganizationalUnit -Name "Groups" -Path $groupOuPath.distinguishedName

        $groupOu = $newGroupOU.distinguishedName
        Write-Host "created ou structure: $groupOu"
    }
}

function Create-ADGroup([string] $newGroupName, [string] $role, [string] $groupOu) {
    $existingGroup = Get-ADGroup -Filter { name -eq $newGroupName }

    if ($existingGroup) {
        Write-Host "OneFirm Group $newGroupName exists. Skipping new group creation..."

        return $existingGroup
    }
    else {
        Write-Host "Creating OneFirm Group $newGroupName..."

        $newGroup =	New-ADGroup `
            -Name $newGroupName `
            -GroupCategory Security `
            -GroupScope Global `
            -Path $groupOu `
            -Description "Security Group - Provides $role level access to the $ProjectCodeName SXR in Azure" `
            -OtherAttributes @{info = "ETS Project: $ETSProjectId" } `
            -PassThru
	
        return $newGroup
    }
}

#Set OU Name
$projectOUName = "ETS" + $ProjectCodeName

#set group names
$developerGroupName = "Sec_" + $ProjectCodeName + "_Developer"

#Crete OU Structure
Write-Host "Creating Project OU Structure...."
$projectOuStructure = Create-ADOrganizationalUnit -ouName $projectOUName
Write-Host "Output1: $groupOu"

$existingOU = Get-ADOrganizationalUnit -Filter "Name -like '$projectOUName'"
$groupOu = Get-ADOrganizationalUnit -SearchBase $existingOU.distinguishedName -Filter "Name -like 'Groups'" -SearchScope OneLevel
Write-Host "output2: $groupOu"

# Create new groups in AD...
$azureDeveloperGroup = Create-ADGroup -newGroupName $developerGroupName -role "Developer" -groupOu $groupOu


#Ensure AzureAd is installed and at the latest version
if (!(Get-Module AzureAD)) {
    Write-Host "Installing/updating AzureAD module..."
    Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force -Scope CurrentUser
    Install-Module AzureAD -Scope CurrentUser -Force
}

Write-Host "Connecting to Azure AD..."
Connect-AzureAD -TenantId $TenantId

function Get-GroupObjectId ($groupName) {
    $group = Get-AzureADGroup -SearchString $groupName
    while (!$group) {
        Write-Host "Waiting 1 minute for Azure AD Sync..."
        Write-Host
        Start-Sleep -Seconds 60
        $group = Get-AzureADGroup -SearchString $groupName
    }
    Write-Host "$groupName exists in Azure..."
    return $group.ObjectId
}


$azureDeveloperGroupObjectId = Get-GroupObjectId -groupName $developerGroupName

Write-Host "Finishing up..."
Write-Host
Write-Host "All groups can be found in the new OU: $groupOu"