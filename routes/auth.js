var express = require('express');
const passport = require("passport");
var router = express.Router();

var auth_controller = require('../controllers/authController');

const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

router.get("/login/success", auth_controller.login_success);
router.get("/login/failed", auth_controller.login_failed);
router.get("/logout", auth_controller.logout);

router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
