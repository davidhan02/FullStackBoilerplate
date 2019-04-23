const express = require('express');
const passport = require('passport');

const requireLogin = require('../../middlewares/requireLogin');
const User = require('../../models/User');

const router = express.Router();

// @route   GET api/users/test
// @desc    Test requireLogin
// @access  Private
router.get('/test', requireLogin, (req, res) =>
  res.json({
    msg: 'Users works!'
  })
);

// @route   GET /api/users/current_user
// @desc    Get the user data
// @access  Public
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

// @route   GET /api/users/logout
// @desc    Log Out from oauth session
// @access  Public
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ session: 'Logged Out' });
});

// @route   POST api/users/login
// @desc    Login a user / Returning auth token
// @access  Public
router.post('/login', (req, res, next) => {
  const errors = {};

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      errors.login = info.msg;
      return res.status(400).json(errors);
    }
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = {};

  User.findOne({ email }).then(user => {
    if (user) {
      errors.register = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
