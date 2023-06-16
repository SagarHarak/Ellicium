
[CmdletBinding()]
param (
    [Parameter()]
    [string] $FilePath,
    [string] $FunctionAppFQDN,
    [string] $TenantID,
    [string] $clientId,
    [string] $RediectURI,
    [string] $ScopeID

)
Write-Host "Replace Tokens in frontend code"

$path = $FilePath
$word1 = '#{functionFQDN}#'
$word2 = '#{Tenant-id}#'
$word3 = '#{clientId}#'
$word4 = '#{redirectUri}#'
$word5 = '#{scope}#'

$replace1 = $FunctionAppFQDN
$replace2 = $TenantID
$replace3 = $clientId
$replace4 = $RediectURI
$replace5 = $ScopeID

((Get-Content -path $path -Raw) -replace $word1 , $replace1) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word2 , $replace2) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word3 , $replace3) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word4 , $replace4) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word5 , $replace5) | Set-Content -Path $path

Write-Host "Tokens replaced succesfully in frontend code"