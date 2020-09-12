const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String
});

module.exports = mongoose.model('User', UserSchema);