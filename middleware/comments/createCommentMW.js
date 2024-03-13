const requireModel = require('../requireModel');

/**
 * Creates a comment in the database and saves it to res.locals.comment
 * Required fields on the body: content
 * @param {object} models - An object containing the models
 */
module.exports = (models) => {
  const Comment = requireModel(models, 'Comment');

  return async (req, res, next) => {
    if (
      typeof req.body.content === 'undefined' ||
      req.params.postId === 'undefined'
    ) {
      return next(new Error('Content and postId required'));
    }

    if (typeof res.locals.comment === 'undefined') {
      res.locals.comment = new Comment();
    }

    res.locals.comment.content = req.body.content;
    res.locals.comment._post = req.params.postId;
    //res.locals.post._author = req.user._id;

    try {
      await res.locals.comment.save();
      return res.redirect(`/posts/${req.params.postId}`);
    } catch (err) {
      return next(err);
    }
  };
};
