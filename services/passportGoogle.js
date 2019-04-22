const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });
        const user = await new User({
          oauthId: profile.id,
          email: email,
          name: profile.displayName
        });
        existingUser
          ? done(null, existingUser)
          : user.save() && done(null, user);
      }
    )
  );
};
