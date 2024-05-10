const { Schema } = require('mongoose');
const db = require('../db');

const userSchema = new Schema({
  username: String,
  usertag: String,
  email: String,
  hash: String,
  salt: String,
  follows: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  avatarUrl: String,
  created_at: Date,
});

const User = db.model('User', userSchema);

module.exports = User;
