const requireModel = require('../requireModel');

/**
 * Deletes a post from the database by id
 * @param {object} models - An object containing the models
 */
module.exports = function deletePostByIdMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    try {
      if (typeof req.params.postId === 'undefined') {
        return next(new Error('ID is required'));
      }

      const post = await PostModel.findOne({ _id: req.params.postId });
      if (!post) {
        return next(new Error('Post not found'));
      }
      if (post._author.toString() !== req.user._id.toString()) {
        return next(new Error('You are not the author of this post'));
      }

      await PostModel.deleteOne({ _id: req.params.postId });

      return res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
};
