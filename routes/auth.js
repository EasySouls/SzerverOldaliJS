const express = require('express');
const passport = require('passport');

const { generatePassword } = require('../lib/passwords.js');

const renderMW = require('../middleware/renderMW.js');

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

// TODO
router.post('/signup', (req, res) => {
  if (
    !req.body.name ||
    !req.body.usertag ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    return res.status(400).send('All fields are required');
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const { salt, hash } = generatePassword(req.body.password);

  const user = new UserModel({
    name: req.body.name,
    usertag: req.body.usertag,
    email: req.body.email,
    hash: hash,
    salt: salt,
  });
});

module.exports = router;
