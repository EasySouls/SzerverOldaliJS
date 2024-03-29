const requireModel = require('../requireModel');

/**
 * Gets the logged in user from the session and saves it to res.locals.user
 */
module.exports = function getLoggedInUserMW(models) {
  const UserModel = requireModel(models, 'User');

  return async (req, res, next) => {
    //const user = await UserModel.find();
    res.locals.user = {
      _id: '5e1d5c4b6b6e4f0017e4e7b',
      name: 'Test User',
      usertag: 'testuser',
      email: 'text@example.com',
    };
    return next();
  };
};
