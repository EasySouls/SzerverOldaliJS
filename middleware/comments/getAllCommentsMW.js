const requireModel = require('../requireModel');

/**
 * Gets all comments from the database and saves them to res.locals.comments
 * @param {object} models - An object containing the models
 */
module.exports = (models) => {
  const CommentModel = requireModel(models, 'Comment');

  return async (req, res, next) => {
    try {
      const comments = await CommentModel.find({});
      res.locals.comments = comments;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
