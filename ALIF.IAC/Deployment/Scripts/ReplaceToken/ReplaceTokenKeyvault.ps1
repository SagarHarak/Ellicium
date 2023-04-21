[CmdletBinding()]
param (
    [Parameter()]
    [string] $SecretJsPath ,
    [string] $keyVaultName
)

Write-Host "Replace Tokens in secrets.js for Keyvault" - ForegroundColor Green 

$path = $SecretJsPath
$token = '#{KEYVAULT_NAME}#'
$replace = $keyVaultName

((Get-Content -path $path -Raw) -replace $token , $replace) | Set-Content -Path $path