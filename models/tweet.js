const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
  location: String,
});

const EntityUrlSchema = new Schema({
  url: String,
  expanded_url: String,
  display_url: String,
});

const TweetSchema = new Schema({
  authUserTwitterId: String,
  id: String,
  text: String,
  created_at: Date,
  entity_url: [EntityUrlSchema],
  entity_hastags: [String],
  user: UserSchema,
});

module.exports = mongoose.model("Tweet", TweetSchema);
