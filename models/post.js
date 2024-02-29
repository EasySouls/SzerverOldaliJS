import { Schema } from 'mongoose';
import db from '../db';

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

export default Post;
