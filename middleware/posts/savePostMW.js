const requireModel = require('../requireModel');

module.exports = (models) => {
  const Post = requireModel(models, 'Post');

  return async (req, res, next) => {
    if (
      typeof req.body.title === 'undefined' ||
      typeof req.body.body === 'undefined'
    ) {
      return next(new Error('Title and body are required'));
    }

    if (typeof res.locals.post === 'undefined') {
      res.locals.post = new Post();
    }

    res.locals.post.title = req.body.title;
    res.locals.post.body = req.body.body;
    res.locals.post.created_at = new Date();
    //res.locals.post._author = req.user._id;
    try {
      await res.locals.post.save();
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  };
};
