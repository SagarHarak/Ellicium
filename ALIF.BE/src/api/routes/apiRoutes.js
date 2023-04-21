const APIController = require("../controllers/apiController");
const router = require("express").Router();

router.post("/v3/commodity_price_intelligence", APIController.commodity_price_intelligence_controll);

router.post("/v3/commodity_price_intelligence_forcast", APIController.commodity_price_intelligence_forcast_controll);

router.get("/v3/demand_planning/items", APIController.getItems);

router.get("/v3/demand_forecast/forecast", APIController.getItemsForecast);

router.post("/v3/demand_planning/items/aggregate", APIController.getItemsAggregate);

module.exports = router;
