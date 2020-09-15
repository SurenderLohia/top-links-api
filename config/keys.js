const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "9yeOHvgHv8rtcZDzTvcjpNDdA",
  TWITTER_CONSUMER_SECRET: "XdTFtWVjc57fv79qYt4hovgJQef9kNgjdvayZZ7tL4sV891pD0",
};

const DB_USER = "nallavan";
const DB_PASSWORD = "chinnaDb_321";
const DB_NAME = "top_links";
const MONGODB = {
  MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.femwi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
};

const SESSION = {
  COOKIE_KEY: "thisappisawesome",
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION,
};

module.exports = KEYS;
