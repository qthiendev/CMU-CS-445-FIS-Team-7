const { connectionPR, connectionHR } = require("../config/connectDB.js");
const getHumanPayrollList = async () => {
  try {
    const sqlQueryHR = "SELECT * FROM Employees";

    const results = await queryHR(sqlQueryHR);
    console.log(">>>>>>>>",results);
    return results;
  } catch (error) {
    console.error("Error getting human payroll list:", error);
    throw error;
  }
};
module.exports = {
    getHumanPayrollList
};