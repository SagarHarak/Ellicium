const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { sql, poolPromise, SQLSCHEMA } = require("../database/db");

class Middleware {
  // To get the values from querystring which is passed by front end
  TransformFilterValues = (value) => {
    let tempStr = value.split("+");
    if (tempStr.length > 1) {
      value = value.replaceAll("'", "");
      value = value.replaceAll("+", "','");
      value = `'${value}'`;
    } else {
      value = `'${value}'`;
    }
    return value;
  };

  TransformFilterValuesofSankey = (b, c) => {
    let filterquery = "";
    let obj = {};

    if (Object.keys(b).length !== 0) {
      let val2 = b.map((value) => value.value);
      let string = val2.join("+");
      let str2 = string.replaceAll("+", `','`);
      let country = `'` + str2 + `'`;
      // let q = ` AND tclc.country IN (${country}) `;
      let q = ` AND twl.country IN (${country}) `;
      filterquery += q;
    }

    if (Object.keys(c).length !== 0) {
      let val3 = c.map((value) => value.value);
      let string = val3.join("+");
      let str3 = string.replaceAll("+", `','`);
      let industry = `'` + str3 + `'`;
      let q = ` AND tnim.industry IN (${industry}) `;
      filterquery += q;
    }
    obj.filterquery = filterquery;
    return obj;
  };

  DecryptPassword = (encryptedstring) => {
    let decrypt = CryptoJS.AES.decrypt(encryptedstring, "My5ecretkey@124");
    let originalText = decrypt.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  UpdateTokens = async (id, accessToken, refreshToken) => {
    let response;
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("userid", sql.Int, id)
        .input("access_token", sql.NVarChar, accessToken)
        .input("refresh_token", sql.NVarChar, refreshToken)
        .query(
          ` UPDATE ${SQLSCHEMA}.tbl_users SET user_access_token=@access_token, user_refresh_token=@refresh_token WHERE user_id=@userid `
        );
      return (response = true);
    } catch (err) {
      return err.message;
    }
  };

  //Function to generate accesstoken
  GenerateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        emailid: user.user_email_id,
      },
      "Thisismyaccesstokenkey123",
      { expiresIn: "900s" }
    );
  };

  //Function to generate refreshtoken
  GenerateRefreshToken = (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        emailid: user.user_email_id,
      },
      "Thisismyrefreshtokenkey123"
    );
  };

  // Function to format KPIs data
  formatKPIs = (data) => {
    let result = {
      "Average Revenue": [],
      "Average Credit Score": [],
    };

    data.map((el) => {
      result["Average Revenue"].push({
        avg_revenue: el.avg_score,
        tier: el.tier,
      });
      result["Average Credit Score"].push({
        avg_score: el.avg_score,
        tier: el.tier,
      });
    });
    return result;
  };

  // Check String for illegal chars
  isSanitized = (req, res, next) => {
    try {
      if (req.body) {
        let input = JSON.stringify(req.body);
        let illegal_chars = [";", "--"];
        illegal_chars.forEach((ele) => {
          if (input.includes(ele)) {
            // return false;
            throw { error: "Body Conatins Illegal Chars" };
          }
        });
        next();
      } else {
        next();
      }
    } catch (error) {
      res.status(400).send("Bad Request");
      console.log(error);
      return;
    }
  };
}

module.exports = new Middleware();
