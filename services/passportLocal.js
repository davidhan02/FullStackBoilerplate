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
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { msg: 'User not found' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { msg: 'Incorrect password' });
          }
          return done(null, user);
        } catch (err) {
          err => done(err);
        }
      }
    )
  );
};
