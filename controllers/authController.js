const passport = require("passport");
//const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_LOGIN_PAGE_URL = "https://top-links.surge.sh";

exports.login_success = function (req, res) {
  if (req.user) {
    console.log("login_success");
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
};

exports.login_failed = function (req, res) {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect(CLIENT_LOGIN_PAGE_URL);
};
