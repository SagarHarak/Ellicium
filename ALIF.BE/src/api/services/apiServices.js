const { poolPromise } = require("../../database/db");

class APIService {
  constructor() {}

  commodity_price_intelligence_service = async (name) => {
    try {
      let query = `select * from alif.commodity_price_intelligence where Name IN (${name})`;
      const pool = await poolPromise;
      const result = await pool.request().query(query);
      return result.recordsets[0];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  commodity_price_intelligence_forcast_service = async (name) => {
    try {
      const pool = await poolPromise;
      const price_trends = await pool
        .request()
        .query(`select * from alif.price_trend where Material = '${name}'`);
      const price_prediction = await pool
        .request()
        .query(
          `select * from alif.price_prediction where Material = '${name}'`
        );
      return {
        price_trends: price_trends.recordsets[0],
        price_prediction: price_prediction.recordsets[0],
      };
    } catch (err) {
      return null;
    }
  };

  getItems = async () => {
    try {
      const pool = await poolPromise;
      const demand_planning = await pool
        .request()
        .query(`
        SELECT  * 
        from alif.demand_planning `);
      return {
        demand_planning: demand_planning.recordsets[0]
      };
    } catch (err) {
      return null;
    }
  };
  getItemsForecast = async () => {
    try {
      const pool = await poolPromise;
      const demand_planning = await pool
        .request()
        .query(`
        SELECT  * 
        from alif.demand_forecast `);
      return {
        demand_planning: demand_planning.recordsets[0]
      };
    } catch (err) {
      return null;
    }
  };
  getItemsAggregate = async (req) => {
    console.log('req in model',req.Grade_type)
    try {
      const pool = await poolPromise;
      let Grade_type_query=""
      let Group_query=""
      let Diameter_query=""
      let lottype_valQuery=""
      let selectquery = "*"
      if (req.Grade_type){
        Grade_type_query = ` AND [Grade type] = '${req.Grade_type}' ` ;
      }
      if (req.Group.length > 0){
        Group_query = ` AND [Group] = '${req.Group}' ` ;
      }
      if (req.Diameter.length > 0){
        Diameter_query = ` AND [Diameter] = '${req.Diameter}' ` ;
      }
      if (req.Lot_number) {
        if (req.Lot_number=="null" ||  req.Lot_number==null){
          lottype_valQuery = ""
          selectquery=` sum([Current Month On-hand Inventory (MTs)]) as 'Current Month On-hand Inventory (MTs)',
          sum([Safety stock]) as 'Safety stock',
          sum([Open Order (MTs) Received within Next 2 Months]) as 'Open Order (MTs) Received within Next 2 Months',
          sum([Demand Forecasted Qty for this 3 Months (MTs)]) as 'Demand Forecasted Qty for this 3 Months (MTs)',
          sum([Gap (MTs)]) as 'Gap (MTs)' ,
          sum([EOQ Quantity]) as 'EOQ Quantity'`
        }
        else{
        lottype_valQuery = ` AND [Lot number] = '${req.Lot_number}'`;
        }
      }
      const demand_planning = await pool
        .request()
        .query(`
        SELECT  ${selectquery} 
        from alif.demand_planning 
        where 1=1 ${Grade_type_query}${Group_query}${Diameter_query}${lottype_valQuery} ;`);
      console.log(`
      SELECT  ${selectquery} 
      from alif.demand_planning 
      where 1=1 ${Grade_type_query}${Group_query}${Diameter_query}${lottype_valQuery} ;`)
      return {
        demand_planning: demand_planning.recordsets[0]
      };
    } catch (err) {
      console.log(err)
      return null;
    }
  };
}

module.exports = new APIService();
