const requireModel = require('../requireModel');

/**
 * Gets all comments by id from the database and saves them to res.locals.comments
 * The postId is taken from the request parameters
 * @param {object} models - An object containing the models
 */
module.exports = (models) => {
  const CommentModel = requireModel(models, 'Comment');

  return async (req, res, next) => {
    if (typeof req.params.postId === 'undefined') {
      return next(new Error('postId required'));
    }

    try {
      const comments = await CommentModel.find({ _post: req.params.postId });
      res.locals.comments = comments;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
