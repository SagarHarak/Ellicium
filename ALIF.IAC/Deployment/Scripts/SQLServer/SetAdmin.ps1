param (

    [string]$sqlServerName ,
    [string]$ResourceGroupName ,
    [string]$ADAdminName ,
    [string]$DbAdminGroup 
)


#Remove SQL server AD Admin if exists and if it is azure devops service principal
$sqlserveradmincheck = (Get-AzSqlServerActiveDirectoryAdministrator `
                            -ServerName $sqlservername `
                            -ResourceGroupName $ResourceGroupName).DisplayName

Write-Host  'sqlserveradmincheck' $sqlserveradmincheck       
if ($sqlserveradmincheck -eq $ADAdminName ){
    Remove-AzSqlServerActiveDirectoryAdministrator `
        -ServerName $sqlservername `
        -ResourceGroupName $ResourceGroupName
    }

# set database db developer group as  admin 
Set-AzSqlServerActiveDirectoryAdministrator `
    -ResourceGroupName $ResourceGroupName `
    -ServerName $sqlServerName `
    -DisplayName $DbAdminGroup