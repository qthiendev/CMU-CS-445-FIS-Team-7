const { connectionHR } = require("../config/connectDB.js");

const getHumanPayrollList = async () => {
  try {
    const sqlQueryHR = "select p.PERSONAL_ID, p.CURRENT_GENDER, p.ETHNICITY, jh.DEPARTMENT, jh.TYPE_OF_WORK from HumanResourceDB.dbo.PERSONAL p join EMPLOYMENT e on e.PERSONAL_ID = p.PERSONAL_ID join JOB_HISTORY jh on jh.EMPLOYMENT_ID = e.EMPLOYMENT_ID where p.SHAREHOLDER_STATUS = 1";

    const request = connectionHR.request(); // Tạo yêu cầu truy vấn từ kết nối connectionHR
    const results = await request.query(sqlQueryHR); // Thực hiện truy vấn
    console.log(">>>>>>>>", results.recordset);
    return results.recordset;
  } catch (error) {
    console.error("Error getting human payroll list:", error);
    throw error;
  }
};

module.exports = {
  getHumanPayrollList,
};