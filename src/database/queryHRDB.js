const {connectionHR} = require("../configs/connectHRDB.js");

const queryHRDB = async (sqlQueryHR) => {
  try {
    const request = connectionHR.request();
    const results = await request.query(sqlQueryHR);

    return results.recordset;
  } catch (error) {
    console.error("[SYSTEM] Failed query HUMAN RESOURCE DB.\n", error);
    throw error;
  }
};

module.exports = {
  queryHRDB,
};