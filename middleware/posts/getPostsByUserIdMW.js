const requireModel = require('../requireModel');

/**
 * Gets the posts which have an _author equal to
 * the userId param and saves it to res.locals.posts
 */
module.exports = function getUserByIdMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    try {
      if (typeof req.params.userId === 'undefined') {
        return next(new Error('ID is required'));
      }
      const posts = await PostModel.find({ _author: req.params.userId });
      res.locals.posts = posts;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
