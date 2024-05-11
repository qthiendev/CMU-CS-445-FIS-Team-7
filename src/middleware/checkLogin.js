const Roles = require("../models/roles.js");
const Accounts = require("../models/accounts.js");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`login`);
  } else {
    const user = await Accounts.findOne({ token: req.cookies.token }).select(
      "-password"
    );
    if (!user) {
      res.redirect(`login`);
    } else {
      const role = await Roles.findOne({ _id: user.role_id }).select(
        "title permission"
      );

      res.locals.user = user;
      res.locals.role = role;

      next();
    }
  }
};
