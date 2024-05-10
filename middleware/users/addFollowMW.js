const requireModel = require('../requireModel');

/**
 * The logged in user will follow the user with the userId in the params
 */
module.exports = function addFollowMW(models) {
  return async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next(new Error('You must be logged in to follow someone'));
    }
    if (res.locals.person === undefined) {
      return next(new Error('Person not found'));
    }
    if (!res.locals.user.follows.includes(res.locals.person._id)) {
      const follows = [...user.follows, res.locals.person._id];
      res.locals.user.follows = follows;
      user.save();
    }
    return next();
  };
};
