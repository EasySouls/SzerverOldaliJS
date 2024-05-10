const passport = require('passport');
const LocalStrategy = require('passport-local');

const { isValidPassword } = require('../lib/passwordUtils.js');

const UserModel = require('../models/user.js');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = (username, password, done) => {
  UserModel.findOne({ email: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = isValidPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      }

      return done(null, false);
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;
