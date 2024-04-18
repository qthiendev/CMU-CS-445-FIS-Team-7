const { connectionHR } = require("../config/connectHRDB.js");


const querryHRDB = async () => {
  try {
    const sqlQueryHR = 'select p.PERSONAL_ID, p.CURRENT_LAST_NAME, p.CURRENT_MIDDLE_NAME,p.CURRENT_FIRST_NAME,p.CURRENT_GENDER,p.ETHNICITY,p.SHAREHOLDER_STATUS,e.EMPLOYMENT_STATUS, sum(ewt.TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH) as TOTAL_VACATION_DAYS from EMPLOYMENT_WORKING_TIME ewt, PERSONAL p, EMPLOYMENT e where e.PERSONAL_ID = p.PERSONAL_ID and e.EMPLOYMENT_ID = ewt.EMPLOYMENT_ID group by p.PERSONAL_ID, p.CURRENT_LAST_NAME, p.CURRENT_MIDDLE_NAME, p.CURRENT_FIRST_NAME, p.CURRENT_GENDER, p.ETHNICITY, p.SHAREHOLDER_STATUS, e.EMPLOYMENT_STATUS;';
    
    const request = connectionHR.request(); // Tạo yêu cầu truy vấn từ kết nối connectionHR
    const results = await request.query(sqlQueryHR); // Thực hiện truy vấn

    return results.recordset;
  } catch (error) {
    console.error("[SYSTEM] Failed querry HUMAN RESOURCE DB.\n", error);
    throw error;
  }
};

module.exports = {
  querryHRDB,
};