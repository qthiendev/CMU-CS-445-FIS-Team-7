const { querryHRDB } = require("../service/querryHRDB.js");
const { querryPRDB } = require("../service/querryPRDB.js");

const getHomepage = async (req, res) => {
  let getHR = await querryHRDB();
  return res.render("homePage.ejs", { getHR });
};

const recordsetFilter = async (req, res) => {
  try {
    let shareholder = req.body.shareholder;
    let gender = req.body.gender;
    let user = req.body.user;
    let department = req.body.department;
    let workType = req.body.workType;

    console.log(">>>>>>>>>>>>>",shareholder);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getHomepage,
  recordsetFilter,
};
