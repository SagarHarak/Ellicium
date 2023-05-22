const sql = require("mssql");
const Config = require("../config/config");
let poolPromise;

const SQLSCHEMA = Config.APSQLSCHEMA;
console.log(Config)
const config = {
    user: Config.APSQLUSER,
    password: Config.APSQLPASSWORD,
    server: Config.APSQLHOST,
    database: Config.APSQLDB,
    host: Config.APSQLHOST,
    port: parseInt(Config.APSQLPORT),
    requestTimeout: 300000,
    connectionTimeout: 300000,
    options: {
        trustServerCertificate: true,
    },
    pool: {
        max: 50,
        min: 0,
        idleTimeoutMillis: 60000
    }
};
poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch((err) =>
        console.log("Database Connection Failed! Invalid Configurations: ", err)
    );

module.exports = {
    sql,
    poolPromise,
    SQLSCHEMA,
};