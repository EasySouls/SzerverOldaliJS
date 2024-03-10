const mongoose = require('../../db');

/**
 * Gets the posts from the database and saves it to res.locals.posts
 */
module.exports = function getAllUsersMW() {
  return async (req, res, next) => {
    const users = await mongoose.model('User').find();
    res.locals.users = users;
    return next();
  };
};
