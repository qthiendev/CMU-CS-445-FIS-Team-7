const { connectionMD } = require("../configs/connectMDDB.js");

const queryMDDB = async (sqlQueryMD) => {
  try {
    const request = connectionMD.request();

    const results = await request.query(sqlQueryMD);

    console.log(sqlQueryMD)

    console.log('[System] queryMDDB.js | Queried MDDB.');

    return results.recordset;
  } catch (error) {
    console.error("[SYSTEM] queryMDDB.js | Cannot query MDDB: ", error);
    throw error;
  }
};

module.exports = {
  queryMDDB,
};
