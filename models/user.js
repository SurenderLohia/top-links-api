const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
  access_token_key: String,
  access_token_secret: String,
  location: String,
});

module.exports = mongoose.model("User", UserSchema);
