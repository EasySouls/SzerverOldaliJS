const requireModel = require('../requireModel');

/**
 * Deletes a post from the database by id
 * @param {object} models - An object containing the models
 */
module.exports = function deletePostByIdMW(models) {
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    try {
      if (typeof req.params.id === 'undefined') {
        return next(new Error('ID is required'));
      }

      await PostModel.deleteOne({ _id: req.params.id });

      return res.redirect('/posts');
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
};
