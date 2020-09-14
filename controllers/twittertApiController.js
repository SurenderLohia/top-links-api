const Twit = require("twit");
const async = require("async");
const { groupBy } = require("lodash");

const keys = require("../config/keys");
const Tweet = require("../models/tweet");

const getTopUser = (userGroups) => {
  let topUserLinksCount = -Infinity;
  let topUser;

  Object.keys(userGroups).forEach((key) => {
    const item = userGroups[key];
    if (item.length > topUserLinksCount) {
      topUserLinksCount = item.length;
      topUser = item;
    }
  });

  return topUser[0].user;
};

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
      entity_hashtags: tweet.entities.hashtags,
      user: {
        name: tweet.user.name,
        screenName: tweet.user.screen_name,
        twitterId: tweet.user.id,
        profileImageUrl: tweet.user.profile_image_url,
        location: tweet.user.location,
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
    if (err) {
      console.log(err);
      // if twiter api rate limit exceeded, get stored tweets from db and send it
      const tweets = await Tweet.find({
        authUserTwitterId: userTwitterId,
      }).sort({ created_at: -1 });

      const userGroups = groupBy(tweets, "user.screenName");
      const topUser = getTopUser(userGroups);

      res.json({
        tweets,
        topUser,
      });

      res.json({ tweets, topUser: {} });
    }
    const tweetsWithLink = data.filter((tweet) => {
      return tweet.entities.urls.length > 0;
    });

    async.map(
      tweetsWithLink,
      async function (tweet) {
        await createTweet(tweet, userTwitterId, function () {
          console.log("Tweet available now: ", tweet.id);
        });
      },
      async (err, results) => {
        if (err) {
          return console.error(err);
        }
        const tweets = await Tweet.find({
          authUserTwitterId: userTwitterId,
        }).sort({ created_at: -1 });

        const userGroups = groupBy(tweets, "user.screenName");
        const topUser = getTopUser(userGroups);

        res.json({
          tweets,
          topUser,
        });
      }
    );
  });
};
