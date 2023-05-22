# Variables for Cosmos DB account and Key Vault
$resourceGroupName = "your-resource-group-name"
$accountName = "your-cosmos-db-account-name"
$keyVaultName = "your-key-vault-name"
$keyName = "your-key-name"

# Login to Azure account and select the subscription
Connect-AzAccount
Select-AzSubscription -SubscriptionId "your-subscription-id"


$resourceGroupName = "EL-AZ-USE2-DEV-BOOK"
$accountName = "eluse2bookcosmosdb"
$keyVaultName = "eluse2bookkeyvault"
$keyName = "cosmos"


# Get the Cosmos DB account
$cosmosDbAccount = Get-AzCosmosDBAccount -ResourceGroupName $resourceGroupName -Name $accountName

# Get read-write key for the Cosmos DB account
$CosmosDBAccountKeys = Get-AzCosmosDBAccountKey -ResourceGroupName $resourceGroupName -Name $accountName -Type "Read-write Keys"

# Get the Key Vault
$keyVault = Get-AzKeyVault -VaultName $keyVaultName -ResourceGroupName $resourceGroupName

# Convert the key to a SecureString
$keySecureString = ConvertTo-SecureString -String $CosmosDBAccountKeys.PrimaryMasterKey -AsPlainText -Force

# Add the key to the Key Vault
$secret = Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $keyName -SecretValue $keySecureString

# Display the URI of the secret in the Key Vault
$secret.SecretUri
