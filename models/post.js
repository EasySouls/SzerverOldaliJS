const { Schema } = require('mongoose');
const db = require('../db');

const postSchema = new Schema({
  title: String,
  body: String,
  created_at: Date,
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Post = db.model('Post', postSchema);

module.exports = Post;
