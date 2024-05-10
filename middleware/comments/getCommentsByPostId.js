const requireModel = require('../requireModel');

/**
 * Gets all comments by id from the database and saves them to res.locals.comments
 * The postId is taken from the request parameters
 * @param {object} models - An object containing the models
 */
module.exports = (models) => {
  const CommentModel = requireModel(models, 'Comment');
  const UserModel = requireModel(models, 'User');

  return async (req, res, next) => {
    if (typeof req.params.postId === 'undefined') {
      return next(new Error('postId required'));
    }

    if (!res.locals.post) {
      return next(new Error('Post not found'));
    }

    try {
      const comments = await CommentModel.find({ _post: req.params.postId });
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const user = await UserModel.findOne({ _id: comment._author });
        comment.author = user;
      }
      res.locals.post.comments = comments;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
