[CmdletBinding()]
param (
    [Parameter()]
    [string] $IndexHtmlPath ,
    [string] $WebAppApiUrl,
    [string] $WebAppRegistrationAppID,
    [string] $AuthRedirectUri,
    [string] $Authority,
    [string] $SCOPES
)

Write-Host "Replace Tokens in index.html for ui"

$path = $IndexHtmlPath
$word1 = '#{API_URL}#'
$word2 = '#{AUTH_APP_ID}#'
$word3 = '#{AUTH_REDIRECT_URI}#'
$word4 = '#{AUTHORITY}#'
$word5 = '#{SCOPES}#'
$replace1 = $WebAppApiUrl
$replace2 = $WebAppRegistrationAppID
$replace3 = $AuthRedirectUri
$replace4 = $Authority
$replace5 = $SCOPES


((Get-Content -path $path -Raw) -replace $word1 , $replace1) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word2 , $replace2) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word3 , $replace3) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word4 , $replace4) | Set-Content -Path $path
((Get-Content -path $path -Raw) -replace $word5 , $replace5) | Set-Content -Path $path