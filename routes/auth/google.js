const express = require('express');
const passport = require('passport');

const User = require('../../models/User');

const router = express.Router();

// @route  GET auth/google
// @desc   Register user with google Oauth
// @access Public
router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

// @route  GET auth/google
// @desc   Login user with google Oauth
// @access Private
router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

module.exports = router;
