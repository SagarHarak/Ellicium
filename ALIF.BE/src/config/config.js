const fetchSecret = require("../key/secrets");

class Config {
  APSQLUSER;
  APSQLPASSWORD;
  APSQLHOST;
  APSQLDB;
  APSQLPORT;
  APSQLSCHEMA;

  async fetchSecretFromKeyVault() {
    try {
      const keys = await fetchSecret();
      return keys;
    } catch (error) {
      console.log(error);
    }
  }

  buildDatabaseConfigObjectLocal() {
    try {
      this.APSQLUSER = process.env.APSQLUSER;
      this.APSQLPASSWORD = process.env.APSQLPASSWORD;
      this.APSQLHOST = process.env.APSQLHOST;
      this.APSQLDB = process.env.APSQLDB;
      this.APSQLPORT = parseInt(process.env.APSQLPORT);
      this.APSQLSCHEMA = process.env.APSQLSCHEMA;
      console.log(`\n`);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  buildDatabaseConfigObject() {
    const secrets = this.fetchSecretFromKeyVault()
      .then((config) => {
        this.APSQLUSER = config[0].value;
        this.APSQLPASSWORD = config[1].value;
        this.APSQLHOST = config[2].value;
        this.APSQLDB = config[3].value;
        this.APSQLPORT = parseInt(config[4].value);
        this.APSQLSCHEMA = config[5].value;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });

    console.log(`\n`);
    return secrets;
  }
}

module.exports = new Config();