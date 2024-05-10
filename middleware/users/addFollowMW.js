const requireModel = require('../requireModel');

/**
 * The logged in user will follow the user with the userId in the params
 */
module.exports = function addFollowMW(models) {
  const UserModel = requireModel(models, 'User');

  return async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);
    const follows = [...user.follows, req.params.userId];
    user.follows = follows;
    user.save();
    res.locals.user = user;
    return next();
  };
};
