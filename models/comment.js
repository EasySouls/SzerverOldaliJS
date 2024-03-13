const { Schema } = require('mongoose');
const db = require('../db');

const commentSchema = new Schema({
  content: String,
  created_at: Date,
  likes: Number,
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  _post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const Comment = db.model('Comment', commentSchema);

module.exports = Comment;
