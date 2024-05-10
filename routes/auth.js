const express = require('express');
const passport = require('passport');

const { generatePassword } = require('../lib/passwordUtils.js');

const renderMW = require('../middleware/renderMW.js');
const UserModel = require('../models/user.js');

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

router.post(
  '/signup',
  async (req, res, next) => {
    if (
      !req.body.name ||
      !req.body.usertag ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirm_password
    ) {
      console.log(req.body);
      return res.render('signup', {
        error: 'All fields are required',
        pageTitle: 'Blaze | Signup',
      });
    }

    if (req.body.password !== req.body.confirm_password) {
      return res.render('signup', {
        error: 'Passwords do not match',
        pageTitle: 'Blaze | Signup',
      });
    }

    const { salt, hash } = generatePassword(req.body.password);

    const user = new UserModel({
      username: req.body.name,
      usertag: req.body.usertag,
      email: req.body.email,
      hash: hash,
      salt: salt,
      follows: [],
    });

    const data = await user.save();
    console.log(data);
    next();
  },
  renderMW('login')
);

router.get('/signout', (req, res, next) => {
  if (req.user) {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.locals.user = null;
      console.log(`${req.user.name} signed out`);
      res.redirect('/');
    });
  }
});

router.get('/forgot-password', renderMW('forgot-password'));

router.post('/forgot-password', async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return res.render('forgot-password', {
      error: 'No user with that email found',
      pageTitle: 'Blaze | Forgot Password',
    });
  }
  return res.render('forgot-password', {
    data: {
      salt: user.salt,
      hash: "You're not getting the hash! That would be a security risk!",
    },
    pageTitle: 'Blaze | Forgot Password',
  });
});

module.exports = router;
