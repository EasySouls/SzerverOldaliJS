const { Schema } = require('mongoose');
const db = require('../db');

const userSchema = new Schema({
  name: String,
  usertag: String,
  email: String,
  hash: String,
  salt: String,
  avatarUrl: String,
  created_at: Date,
});

const User = db.model('User', userSchema);

module.exports = User;
