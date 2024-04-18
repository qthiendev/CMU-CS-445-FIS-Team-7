const { connectionHR } = require("../config/connectHRDB.js");


const queryHRDB = async (sqlQueryHR) => {
  try {
    const request = connectionHR.request(); // Tạo yêu cầu truy vấn từ kết nối connectionHR
    const results = await request.query(sqlQueryHR); // Thực hiện truy vấn

    return results.recordset;
  } catch (error) {
    console.error("[SYSTEM] Failed query HUMAN RESOURCE DB.\n", error);
    throw error;
  }
};

module.exports = {
  queryHRDB,
};