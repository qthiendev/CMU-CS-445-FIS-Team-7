const bcrypt = require("bcrypt");
const User = require("../models/account.js");
module.exports = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // if passwords match
          req.session.userId = user._id;
          res.redirect("/homePage");
        } else {
          res.redirect("/homePage");
        }
      });
    } else {
      res.redirect("/");
    }
  });
};
