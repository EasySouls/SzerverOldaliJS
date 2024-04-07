const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

const { isValidPassword } = require('../lib/passwordUtils.js');

const UserModel = require('../models/user.js');

const verifyCallback = (username, password, done) => {
  const user = UserModel.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      // TODO - Implement password hashing
      const isValid = true;

      if (isValid) {
        return done(null, user);
      }

      return done(null, false);
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
