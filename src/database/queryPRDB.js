const {connectionPR} = require("../configs/connectPRDB.js");

const queryPRDB = async (mysqlQueryPR) => {
    try {
      const [request, fields] = await connectionPR.promise().query(mysqlQueryPR);

      console.log('[System] queryPRDB.js | Queried PRDB.');

      return request;
    } catch (error) {
      console.error("[SYSTEM] queryPRDB.js | Cannot queried PRDB: ", error);
      throw error;
    }
  };
  
  module.exports = {
    queryPRDB,
  };