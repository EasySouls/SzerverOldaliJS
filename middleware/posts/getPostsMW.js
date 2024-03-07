const mongoose = require('../../db');

/**
 * Gets the posts from the database and saves it to res.locals.posts
 */
module.exports = function getPostsMW() {
  return async (req, res, next) => {
    const posts = await mongoose.model('Post').find();
    res.locals.posts = posts;
    return next();
  };
};
