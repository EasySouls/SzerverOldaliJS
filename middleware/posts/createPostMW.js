const requireModel = require('../requireModel');

/**
 * Creates a post in the database and saves it to res.locals.posts
 * Required fields on the body: title, body
 * @param {object} models - An object containing the models
 */
module.exports = (models) => {
  const Post = requireModel(models, 'Post');

  return async (req, res, next) => {
    if (
      typeof req.body.title === 'undefined' ||
      typeof req.body.content === 'undefined'
    ) {
      return next(new Error('Title and content are required'));
    }

    if (typeof res.locals.post === 'undefined') {
      res.locals.post = new Post();
    }

    res.locals.post.title = req.body.title;
    res.locals.post.body = req.body.content;
    res.locals.post.createdAt = new Date();
    res.locals.post._author = req.user._id;
    try {
      const saved = await res.locals.post.save();
      console.log(saved);

      console.log('Post created: ' + res.locals.post);

      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  };
};
