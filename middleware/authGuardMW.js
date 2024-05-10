/**
 *
 * @description Middleware to check if the user is authenticated.
 * If the user is logged in, saves it to res.locals.user and calls next, otherwise redirects to /login
 */

module.exports = function authGuardMW() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
      return next();
    }
    return res.redirect('/login');
  };
};
