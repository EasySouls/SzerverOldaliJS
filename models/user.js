import { Schema } from 'mongoose';
import db from '../db';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  created_at: Date,
});

const User = db.model('User', userSchema);

export default User;
