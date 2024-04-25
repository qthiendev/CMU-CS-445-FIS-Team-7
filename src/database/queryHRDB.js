const {connectionHR} = require("../configs/connectHRDB.js");

const queryHRDB = async (sqlQueryHR) => {
  try {
    const request = connectionHR.request();
    const results = await request.query(sqlQueryHR);

    console.log('[System] queryHRDB.js | Queried HRDB.');

    return results.recordset;
  } catch (error) {
    console.error("[SYSTEM] queryHRDB.js | Cannot queried HRDB: ", error);
    throw error;
  }
};

module.exports = {
  queryHRDB,
};