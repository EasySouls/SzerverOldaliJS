const requireModel = require('../requireModel');

/**
 * Gets the users from the database and saves it to res.locals.users
 */
module.exports = function getAllUsersMW(models) {
  const UserModel = requireModel(models, 'User');

  return async (req, res, next) => {
    const users = await UserModel.find();
    res.locals.users = users;
    return next();
  };
};
