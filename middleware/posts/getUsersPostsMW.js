const requireModel = require('../requireModel');

/**
 * Gets the posts of the logged in user and saves it to res.locals.posts
 */
module.exports = function getUsersPostsMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return next(new Error('You must be logged in to view your posts'));
      }
      const posts = await PostModel.find({ _author: req.user._id });
      res.locals.posts = posts;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
