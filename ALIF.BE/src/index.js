const express = require("express");
const cors = require("cors");
const app = express();
const Config = require("./config/config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
require("dotenv").config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let message = "";
if (process.env.NODE_ENV == "development") {
  let flag = Config.buildDatabaseConfigObjectLocal();
  if (flag) {
    try {
      message = "Fetched Local Credentials\nConnecting To Database...";
      const APIRoutes = require("./api/routes/apiRoutes");
      app.use("/api", APIRoutes);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
} else {
  message = `Please wait while we fetch Database Credentials From Key Vault...`;
  Config.buildDatabaseConfigObject()
    .then(() => {
      try {
        const APIRoutes = require("./api/routes/apiRoutes");
        app.use("/api", APIRoutes);
      } catch (error) {
        console.log(error);
        throw error;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

app.get("/", (req, res) => {
  res.send({ hello: "Server Running" });
});

app.listen(port, () => {
  console.log(`Server running in port ${port}\n${message}`);
});