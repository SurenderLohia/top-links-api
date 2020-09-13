var express = require("express");
const passport = require("passport");
const router = express.Router();

const keys = require("../config/keys");

const twitterApiController = require("../controllers/twittertApiController");

router.get(
  "/get-tweets-contain-link",
  twitterApiController.get_tweets_contain_links
);

module.exports = router;
