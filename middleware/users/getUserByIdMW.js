const requireModel = require('../requireModel');

/**
 * Get a person from the database and saves it to res.locals.person
 */
module.exports = function getUserByIdMW(models) {
  const UserModel = requireModel(models, 'User');

  return async (req, res, next) => {
    console.log(req.params.userId);
    try {
      if (typeof req.params.userId === 'undefined') {
        return next(new Error('ID is required'));
      }
      const person = await UserModel.findOne({ _id: req.params.userId });
      console.log(person);
      res.locals.person = person;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};