const { connectionPR } = require("../configs/connectPRDB.js");

const queryPRDB = async (mysqlQueryPR) => {
  try {
    const [request, fields] = await connectionPR.promise().query(mysqlQueryPR);

    console.log('[System] queryPRDB.js | Queried PRDB.');

    return request;
  } catch (error) {
    console.error("[SYSTEM] queryPRDB.js | Cannot query PRDB: ", error);
    throw error;
  }
};

const queryPRDBSetOnly = async (mysqlQueryPR) => {
  try {
    await connectionPR.promise().query(mysqlQueryPR);

    console.log('[System] queryPRDB.js | Queried HRDB Set Only.');
    
  } catch (error) {
    console.error("[SYSTEM] queryPRDB.js | Cannot query HRDB Set Only: ", error);
    throw error;
  }
};

module.exports = {
  queryPRDB,
  queryPRDBSetOnly
};