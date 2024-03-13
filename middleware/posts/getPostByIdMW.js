const requireModel = require('../requireModel');

/**
 * Gets a post from the database and saves it to res.locals.post
 * @param {object} models - An object containing the models
 */
module.exports = function getAllPostsMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    try {
      if (typeof req.params.id === 'undefined') {
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
