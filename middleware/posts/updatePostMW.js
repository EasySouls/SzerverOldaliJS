const requireModel = require('../requireModel');

/**
 * Updates a post by id in the database and saves it to res.locals.post
 * @param {object} models - An object containing the models
 */
module.exports = function updatePostMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    try {
      if (typeof req.params.id === 'undefined') {
        return next(new Error('ID is required'));
      }

      if (
        typeof req.body.title === 'undefined' ||
        typeof req.body.content === 'undefined'
      ) {
        return next(new Error('Title and content are required'));
      }

      const post = await PostModel.updateOne(
        { _id: req.params.id },
        { title: req.body.title, content: req.body.content }
      );
      res.locals.post = post;
      return res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
      return next(err);
    }
  };
};
