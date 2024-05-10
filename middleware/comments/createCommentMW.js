const requireModel = require('../requireModel');

/**
 * Creates a comment in the database and saves it to res.locals.comment
 * Required fields on the body: content
 * @param {object} models - An object containing the models
 */
module.exports = (models) => {
  const CommentModel = requireModel(models, 'Comment');

  return async (req, res, next) => {
    if (
      typeof req.body.content === 'undefined' ||
      req.params.postId === 'undefined'
    ) {
      return next(new Error('Content and postId required'));
    }

    try {
      await CommentModel.create({
        content: req.body.content,
        _post: req.params.postId,
        _author: req.user._id,
      });
      return res.redirect(`/posts/${req.params.postId}`);
    } catch (err) {
      return next(err);
    }
  };
};
