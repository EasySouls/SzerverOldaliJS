const requireModel = require('../requireModel');

/**
 * Gets the posts from the database and saves it to res.locals.posts
 * @param {object} models - An object containing the models
 */
module.exports = function getAllPostsMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    const posts = await PostModel.find();
    res.locals.posts = posts;
    return next();
  };
};
