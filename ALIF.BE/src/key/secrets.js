const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const url = "https://#{KEYVAULT_NAME}#.vault.azure.net";
const client = new SecretClient(url, credential);

async function fetchSecret() {
  try {
    const [
      APSQLUSER,
      APSQLPASSWORD,
      APSQLHOST,
      APSQLDB,
      APSQLPORT,
      APSQLSCHEMA,
    ] = await Promise.all([
      client.getSecret(`SQLUser`),
      client.getSecret(`SQLPassword`),
      client.getSecret(`ServerName`),
      client.getSecret(`DatabaseName`),
      client.getSecret(`SQLPort`),
      client.getSecret(`SQLSchema`),
    ]);
    console.log(`Fetching Keys Successfull.\nConnecting To Database..`);
    return [
      APSQLUSER,
      APSQLPASSWORD,
      APSQLHOST,
      APSQLDB,
      APSQLPORT,
      APSQLSCHEMA,
    ];
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchSecret;