const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {
  OAUTH2_CALLBACK,
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
} = require('../config/keys');

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy(
    {
      clientID: OAUTH2_CLIENT_ID,
      clientSecret: OAUTH2_CLIENT_SECRET,
      callbackURL: OAUTH2_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };

      // Remove after demonstration
      console.log('\n[userData Authenticated:');
      console.log(`name: ${userData.name}`);
      console.log(`email: ${userData.email}]\n`);

      done(null, userData);
    },
  ),
);
