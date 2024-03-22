const requireModel = require('../requireModel');

/**
 * Gets a post from the database and saves it to res.locals.post
 * The postId is taken from the request parameters
 * @param {object} models - An object containing the models
 */
module.exports = function getAllPostsMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    try {
      if (typeof req.params.postId === 'undefined') {
        return next(new Error('ID is required'));
      }

      const post = await PostModel.findById(req.params.id);
      res.locals.post = post;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
