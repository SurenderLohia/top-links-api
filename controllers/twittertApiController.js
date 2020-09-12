const keys = require("../config/keys");

const Twit = require("twit");

exports.get_tweets = function (req, res) {
  console.log(req.user);

  var T = new Twit({
    consumer_key: keys.TWITTER_CONSUMER_KEY,
    consumer_secret: keys.TWITTER_CONSUMER_SECRET,
    access_token: req.user.access_token_key,
    access_token_secret: req.user.access_token_secret,
  });

  T.get("statuses/home_timeline", { count: 5 }, function (err, data, response) {
    console.log("finnaly");
    console.log(data);

    res.json(data);
  });
};
