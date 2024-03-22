const requireModel = require('../requireModel');

/**
 * Gets all comments by id from the database and saves them to each post in res.locals.posts
 * as an array of comments named comments
 * The postId's should be in the res.locals.posts object
 * @param {object} models - An object containing the models
 */
module.exports = (models) => {
  const CommentModel = requireModel(models, 'Comment');

  return async (req, res, next) => {
    if (typeof res.locals.posts === 'undefined') {
      return next(
        new Error('The posts are required to get the comments by post id')
      );
    }

    try {
      for (const post of res.locals.posts) {
        const comments = await CommentModel.find({ _post: post._id });
        post.comments = comments;
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
