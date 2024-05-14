const { getBirthdayAlert } = require("../../services/alerts/getBirthdayAlert");

const renderBirthdayAlertView = async (req, res) => {
  try {
    let day = req.query.day;
    console.log("req>>>>>>", req.query);
    let data = await getBirthdayAlert(day);

    res.render("alertBirthdayPage.ejs", {
      data,
      day,
    });
    console.log(
      "[System] birthdayAlertController.js | Rendered alertBirthdayPage."
    );
  } catch (err) {
    console.log("[System] Error at birthdayAlertController.js:", err);
  }
};

module.exports = { renderBirthdayAlertView };
