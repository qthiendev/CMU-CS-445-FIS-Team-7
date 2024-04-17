const {connectionHR} = require("../config/connectHRDB.js");

const querryHRDB = async () => {
    try {
      //const sqlQueryHR = "select p.PERSONAL_ID, p.CURRENT_GENDER, p.ETHNICITY, jh.DEPARTMENT, jh.TYPE_OF_WORK from HumanResourceDB.dbo.PERSONAL p join EMPLOYMENT e on e.PERSONAL_ID = p.PERSONAL_ID join JOB_HISTORY jh on jh.EMPLOYMENT_ID = e.EMPLOYMENT_ID";
      const sqlQueryHR = 'select * from PERSONAL';
      const request = connectionHR.request(); // Tạo yêu cầu truy vấn từ kết nối connectionHR
      const results = await request.query(sqlQueryHR); // Thực hiện truy vấn

      // const birthDates = results.recordset.map(record => ({
      //   PERSONAL_ID: record.PERSONAL_ID,
      //   BIRTH_DATE: record.BIRTH_DATE
      // })); // Lấy ID và ngày sinh

      const genderFilter = 'M'

      const specificResult = results.recordset.filter(record => record.CURRENT_GENDER === genderFilter)
  
      //console.log("HUMAN RESOURCE DB QUERRY DATA>>>>>", results.recordset);
      return results.recordset;
    } catch (error) {
      console.error("[SYSTEM] Failed querry HUMAN RESOURCE DB.\n", error);
      throw error;
    }
  };
  
  module.exports = {
    querryHRDB,
  };