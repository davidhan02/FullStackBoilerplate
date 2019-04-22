const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          !user || !user.validPassword(password)
            ? done(null, false, { message: 'Invalid username/password' })
            : done(null, user);
        } catch (err) {
          err => done(err);
        }
      }
    )
  );
};
