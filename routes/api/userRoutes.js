const express = require('express');
const passport = require('passport');

const User = require('../../models/User');

const router = express.Router();

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users works!'
  })
);

// @route  GET /api/users/logout
// @desc   Log Out from oauth session
// @access private
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ session: 'logout' });
});

// @route   POST api/users/login
// @desc    Login a user / Returning auth token
// @access  Public
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exits' });
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
