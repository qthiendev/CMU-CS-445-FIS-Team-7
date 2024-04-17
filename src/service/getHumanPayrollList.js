const { connectionHR } = require("../config/connectDB.js");

const getHumanPayrollList = async () => {
  try {
    //const sqlQueryHR = "select p.PERSONAL_ID, p.CURRENT_GENDER, p.ETHNICITY, jh.DEPARTMENT, jh.TYPE_OF_WORK from HumanResourceDB.dbo.PERSONAL p join EMPLOYMENT e on e.PERSONAL_ID = p.PERSONAL_ID join JOB_HISTORY jh on jh.EMPLOYMENT_ID = e.EMPLOYMENT_ID where p.SHAREHOLDER_STATUS = 1";
    const sqlQueryHR = "select * from PERSONAL"
    const request = connectionHR.request(); // Tạo yêu cầu truy vấn từ kết nối connectionHR
    const results = await request.query(sqlQueryHR); // Thực hiện truy vấn

    const birthDates = results.recordset.map(record => ({
      PERSONAL_ID: record.PERSONAL_ID,
      BIRTH_DATE: record.BIRTH_DATE
    })); // Lấy ID và ngày sinh

    console.log(">>>>>>>>", results.recordset);
    console.log(">>>>>>>>", birthDates);
    return results.recordset;
  } catch (error) {
    console.error("Error getting human payroll list:", error);
    throw error;
  }
};

module.exports = {
  getHumanPayrollList,
};