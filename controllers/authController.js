const passport = require("passport");

exports.login_success = function(req, res) {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
}

exports.login_failed = function(req, res) {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
}


