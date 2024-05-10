const { Schema } = require('mongoose');
const db = require('../db');

const postSchema = new Schema({
  title: String,
  body: String,
  createdAt: Date,
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  _comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Post = db.model('Post', postSchema);

module.exports = Post;
