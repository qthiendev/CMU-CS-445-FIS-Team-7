const {connectionPR} = require("../config/connectPRDB.js");

const querryPRDB = async () => {
    try {

      const [request, fields] = await connectionPR.promise().query(sqlQueryPR);

      console.log("PAYROLL DB QUERRY DATA>>>>>", request);
      return results.recordset;
    } catch (error) {
      console.error("Error getting payroll list:", error);
      throw error;
    }
  };
  
  module.exports = {
    querryPRDB,
  };