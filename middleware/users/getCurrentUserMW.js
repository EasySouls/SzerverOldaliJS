/**
 * If the user is logged in, saves it to res.locals.user however it allows the request to continue.
 * Used when the user is not required to be logged in.
 */

module.exports = function getCurrentUserMW() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
    }
    return next();
  };
};
