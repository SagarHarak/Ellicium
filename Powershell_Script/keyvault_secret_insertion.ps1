# $secret = ConvertTo-SecureString "SuperSecret02" -AsPlainText -Force
# Set-AzKeyVaultSecret -VaultName "Ellicium-keyvault" -Name "$Name" -SecretValue $secret

# "Name" : "['ellicium11' , 'ellicium12']",
# Set-AzKeyVaultSecret -VaultName "Ellicium-keyvault" -Name "Name" -SecretValue $secret

# $Name = 'ellicium11',
#         'ellicium12'

   
#         "$Name"=
#           @{
#             "secretName": "ellicium101",
#             "secretValue": "1234"
#           },
#           @{
#             "secretName": "ellicium102",
#             "secretValue": "1234"
#           }

$keyvaultnamesecret = @{
    "ellicium101" = "1234"
    "ellicium102" = "1234"
}
foreach ($h in $keyvaultnamesecret.GetEnumerator()) {
    Write-Host "$($h.Name): $($h.Value)"
    $secret = ConvertTo-SecureString "$($h.Value)" -AsPlainText -Force
    Set-AzKeyVaultSecret -VaultName "Ellicium-keyvault" -Name "$($h.Name)" -SecretValue $secret
}
        
#Set-AzKeyVaultSecret -VaultName "Ellicium-keyvault" -Name "$h.Name" -SecretValue $secret

#$Name = @{"secretName": "ellicium101"}
