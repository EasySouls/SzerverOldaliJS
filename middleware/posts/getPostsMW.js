import mongoose from '../../db/index.js';

/**
 * Gets the posts from the database and saves it to res.locals.posts
 */
export function getPostsMW() {
  return async (req, res, next) => {
    const posts = await mongoose.model('Post').find();
    res.locals.posts = posts;
    return next();
  };
}
