const Roles = require("../models/roles.js");
const Accounts = require("../models/accounts.js");
const moment = require('moment');

module.exports.requireAuth = async (req, res, next) => {
  try {
    const user = await Accounts.findOne({ token: req.cookies.token }).select("-password");
    if (!user || moment().isAfter(user.tokenExpiry)) {
      res.redirect('login');
    } else {
      const role = await Roles.findOne({ _id: user.role_id }).select("title permission");
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  } catch (error) {
    console.error("Authentication error: ", error);
    res.redirect('login');
  }
};
