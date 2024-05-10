const requireModel = require('../requireModel');

/**
 * Gets the followed users from the database and saves it to res.locals.follows
 */
module.exports = function getFollowsMW(models) {
  const UserModel = requireModel(models, 'User');
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    const follows = await UserModel.find({ _id: req.user.follows });
    follows.posts = [];
    for (const followed of follows) {
      const posts = PostModel.find({ _author: followed._id });
      follows.posts = [...follows.posts, ...posts];
    }
    res.locals.follows = follows;
    return next();
  };
};
