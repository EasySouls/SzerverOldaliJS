const { Schema } = require('mongoose');
const db = require('../db');

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  created_at: Date,
});

const User = db.model('User', userSchema);

module.exports = User;
