const requireModel = require('../requireModel');

/**
 * Gets the followed users from the database and saves it to res.locals.follows
 */
module.exports = function getFollowsMW(models) {
  const UserModel = requireModel(models, 'User');
  const PostModel = requireModel(models, 'Post');

  return async (req, res, next) => {
    if (res.locals.user.follows === undefined) {
      return next(new Error('User follows not found'));
    }

    const posts = [];
    const followedUsers = [];
    for (const userId of res.locals.user.follows) {
      const user = await UserModel.findById(userId);
      if (user === null) {
        continue;
      }

      followedUsers.push(user);

      const userPosts = await PostModel.find({ _author: userId });
      for (const post of userPosts) {
        post.author = user;
      }
      posts.push(...userPosts);
    }
    res.locals.posts = posts;
    res.locals.followedUsers = followedUsers;
    return next();
  };
};
