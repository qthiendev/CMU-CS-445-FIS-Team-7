const { connectionHR } = require("../configs/connectHRDB.js");

const queryHRDB = async (sqlQueryHR) => {
  try {
    const request = connectionHR.request();
    const results = await request.query(sqlQueryHR);

    console.log('[System] queryHRDB.js | Queried HRDB.');

    return results.recordset;
  } catch (error) {
    console.error("[SYSTEM] queryHRDB.js | Cannot query HRDB: ", error);
    throw error;
  }
};

const queryHRDBSetOnly = async (sqlQueryHR) => {
  try {
    const request = connectionHR.request();
    const results = await request.query(sqlQueryHR);

    console.log('[System] queryHRDB.js | Queried HRDB Set Only.');
    return results;
  } catch (error) {
    console.error("[SYSTEM] queryHRDB.js | Cannot query HRDB: ", error);
    throw error;
  }
};

module.exports = {
  queryHRDB,
  queryHRDBSetOnly
};