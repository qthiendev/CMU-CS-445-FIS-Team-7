const { querryHRDB } = require("../service/querryHRDB.js");
const { querryPRDB } = require("../service/querryPRDB.js");

const filter = async (getHR) => {
  try {
    let shareholder = req.body.shareholder;
    let gender = req.body.gender;
    let user = req.body.user;
    let department = req.body.department;
    let workType = req.body.workType;

    console.log("{Filter: ", shareholder, gender, user, department, workType,"}");

    let filteredData = getHR.filter(record => 
      (shareholder == null || record.shareholder === shareholder) &&
      (gender == null || record.gender === gender) &&
      (user == null || record.user === user) &&
      (department == null || record.department === department) &&
      (workType == null || record.workType === workType)
    );

    return filteredData;
  } catch (error) {
    console.error(error);
  }
}

const getHomepage = async (req, res) => {
  let getHR = await filter(querryHRDB());
  return res.render("homePage.ejs", { getHR });
};

const recordsetFilter = async (req, res) => {
  try {
    let shareholder = req.body.shareholder;
    let gender = req.body.gender;
    let user = req.body.user;
    let department = req.body.department;
    let workType = req.body.workType;

    console.log("{Filter: ", shareholder, gender, user, department, workType,"}");
    return {shareholder, gender, user, department, workType}
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getHomepage,
  recordsetFilter,
};
