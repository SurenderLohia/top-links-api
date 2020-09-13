const Twit = require("twit");
var async = require("async");

const keys = require("../config/keys");
const Tweet = require("../models/tweet");

async function createTweet(tweet, userTwitterId, cb) {
  const currentTweet = await Tweet.findOne({
    authUserTwitterId: userTwitterId,
    id: tweet.id,
  });

  if (!currentTweet) {
    const newTweet = new Tweet({
      authUserTwitterId: userTwitterId,
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      entity_url: tweet.entities.urls,
      user: {
        name: tweet.user.name,
        screenName: tweet.user.screen_name,
        twitterId: tweet.user.id,
        profileImageUrl: tweet.user.profile_image_url,
      },
    });

    newTweet.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }

      cb(null, tweet);
    });
  }

  cb(null, tweet);
}

exports.get_tweets_contain_links = function (req, res) {
  const T = new Twit({
    consumer_key: keys.TWITTER_CONSUMER_KEY,
    consumer_secret: keys.TWITTER_CONSUMER_SECRET,
    access_token: req.user.access_token_key,
    access_token_secret: req.user.access_token_secret,
  });

  const userTwitterId = req.user.twitterId;

  T.get("statuses/home_timeline", async function (err, data, response) {
    const tweetsWithLink = data.filter((tweet) => {
      return tweet.entities.urls.length > 0;
    });

    async.map(
      tweetsWithLink,
      async function (tweet) {
        await createTweet(tweet, userTwitterId, function () {
          console.log("Created tweet: ", tweet.id);
        });
      },
      async (err, results) => {
        if (err) {
          return console.error(err);
        }
        const tweets = await Tweet.find({ authUserTwitterId: userTwitterId });
        console.log(tweets);
        res.json(tweets);
      }
    );
  });
};
