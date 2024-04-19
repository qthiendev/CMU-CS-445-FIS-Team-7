const {connectionPR} = require("../config/connectPRDB.js");

const queryPRDB = async (mysqlQueryPR) => {
    try {

      const [request, fields] = await connectionPR.promise().query(mysqlQueryPR);
      return results.recordset;
    } catch (error) {
      console.error("Error getting payroll list:", error);
      throw error;
    }
  };
  
  module.exports = {
    queryPRDB,
  };