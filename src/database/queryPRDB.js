const {connectionPR} = require("../configs/connectPRDB.js");

const queryPRDB = async (mysqlQueryPR) => {
    try {

      const [request, fields] = await connectionPR.promise().query(mysqlQueryPR);
      return request;
    } catch (error) {
      console.error("Error getting payroll list:", error);
      throw error;
    }
  };
  
  module.exports = {
    queryPRDB,
  };