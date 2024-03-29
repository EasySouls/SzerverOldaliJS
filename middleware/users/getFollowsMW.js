const requireModel = require('../requireModel');

/**
 * Gets the followed users from the database and saves it to res.locals.follows
 */
module.exports = function getFollowsMW(models) {
  const UserModel = requireModel(models, 'User');

  return async (req, res, next) => {
    //const users = await UserModel.find();
    const follows = [
      {
        _id: '5f8f6',
        name: 'John Doe',
        usertag: 'johndoe',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '5f8f7',
        name: 'Jane Doe',
        usertag: 'janedoe',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '5f8f8',
        name: 'Alice',
        usertag: 'alice',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '5f8f9',
        name: 'Bob',
        usertag: 'bob',
        avatarUrl: 'https://via.placeholder.com/150',
      },
    ];
    res.locals.follows = follows;
    return next();
  };
};
