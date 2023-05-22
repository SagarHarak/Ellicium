const APIService = require("../services/apiServices");

class APIController {
  commodity_price_intelligence_controll = async (req, res) => {
    let result = await APIService.commodity_price_intelligence_service(
      req.body.name
    );
    if (result) {
      const information = [];
      for (let data of result) {
        information.push({
          name: data.Name,
          last_price: data["Last Price"],
          date: data.Date,
        });
      }
      result = information
      res.status(200).send({
        status: 200,
        message: "Data Found!",
        data: result,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: "Something Went Wrong!",
        data: result,
      });
    }
  };

  commodity_price_intelligence_forcast_controll = async (req, res) => {
    let result = await APIService.commodity_price_intelligence_forcast_service(
      req.body.name
    );
    if (result) {
      result = [...result.price_trends, ...result.price_prediction];
      const information = [];
      for (let data of result) {
        if (data["Current date"]) {
          information.push({
            Material: data.Material,
            current_price: data["Current price"],
            date: new Date(data["Current date"]),
            upper_price: data["Upper price"],
            lower_price: data["Lower price"],
            horizon: data.Horizon,
            predict_date: new Date(data["Predicted for Date"]),
            predict_price: data["Predicted Price ($/t)"],
            diff_current_price: data["[Vs Current ($/t)]"],
            direction: data.Direction,
          });
        } else {
          information.push({
            Material: data.Material,
            current_price: data.current_price,
            date: new Date(data.Date),
          });
        }
      }

      result = information;

      res.status(200).send({
        status: 200,
        message: "Data Found!",
        data: result,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: "Something Went Wrong!",
        data: result,
      });
    }
  };
  getItems = async (req, res) => {
    const result = await APIService.getItems() 
      if (result) {
        res.send({
          status: 'null',
          message: 'null',
          data: result,
        })
      } else {
        res.send({
          status: 'null',
          message: 'null',
          data: result,
        }
        );
      }
  };
  getItemsForecast = async (req, res) => {
    const result = await APIService.getItemsForecast() 
      if (result) {
        res.send({
          status: 'null',
          message: 'null',
          data: result,
        })
      } else {
        res.send({
          status: 'null',
          message: 'null',
          data: result,
        }
        );
      }
  };
  getItemsAggregate = async (req, res) => {
    console.log('req.body',req.body);
    const result = await APIService.getItemsAggregate(req.body) 
      if (result) {
        res.send({
          status: 'null',
          message: 'null',
          data: result,
        })
      } else {
        res.send({
          status: 'null',
          message: 'null',
          data: result,
        }
        );
      }
  };
   
  };




module.exports = new APIController();
