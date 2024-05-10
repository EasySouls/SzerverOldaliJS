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
      name: req.body.name,
      usertag: req.body.usertag,
      email: req.body.email,
      hash: hash,
      salt: salt,
    });

    const data = await user.save();
    console.log(data);
    next();
  },
  renderMW('login')
);

router.get('/signout', (req, res) => {
  if (req.user) {
    req.logOut();
    res.locals.user = null;
    console.log(`${user.name} signed out`);
  }
  res.redirect('/');
});

module.exports = router;
