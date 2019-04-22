const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users works!'
  })
);

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.post('/register', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ email: 'Email already exists' });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        const addedUser = await newUser.save();
        res.json(addedUser);
      });
    });
  }
});

module.exports = router;
