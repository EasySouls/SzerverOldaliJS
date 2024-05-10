const requireModel = require('../requireModel');

/**
 * Gets the posts from the database and saves it to res.locals.posts
 * @param {object} models - An object containing the models
 */
module.exports = function getAllPostsMW(models) {
  const PostModel = requireModel(models, 'Post');
  const UserModel = requireModel(models, 'User');

  return async (req, res, next) => {
    const posts = await PostModel.find();
    for (const post of posts) {
      const author = await UserModel.findById(post._author);
      post.author = {
        name: author.username,
        usertag: author.usertag,
        _id: author._id,
      };
      console.log(post.author);
    }
    res.locals.posts = posts;
    return next();
  };
};
