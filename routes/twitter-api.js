var express = require("express");
const passport = require("passport");
const router = express.Router();

const keys = require("../config/keys");

const twitterApiController = require("../controllers/twittertApiController");

router.get("/get-tweets", twitterApiController.get_tweets);

module.exports = router;
