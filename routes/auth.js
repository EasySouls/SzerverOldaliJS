const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

const renderMW = require('../middleware/renderMW.js');
const UserModel = require('../models/user.js');

passport.use(
  new LocalStrategy(async function verify(username, password, done) {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    crypto.pbkdf2(
      password,
      user.salt,
      100000,
      64,
      'sha512',
      (err, derivedKey) => {
        if (err) {
          return done(err);
        }

        if (derivedKey.toString('hex') === user.password) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect password.' });
      }
    );
  })
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, username: user.name, usertag: user.usertag });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user);
  });
});

const router = express.Router();

router.get('/login', renderMW('login'));

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/signup', renderMW('signup'));

module.exports = router;
