const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(new GoogleStrategy({
    clientID: '85181241331-a4hdp8dsb218mmjdahps0bbc67b57qbo.apps.googleusercontent.com',
    clientSecret: 'qpLvQ1zPOxLgN9X-Tu1RsFLK',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  (token, refreshToken, profile, done) => done(null, {
    profile,
    token,
  })));
};
