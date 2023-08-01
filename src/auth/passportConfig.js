const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

let secert=process.env.SECRET
let clientId=process.env.CLIENTID
let clientSecret= process.env.CLIENTSECRET
let callback=process.env.CALLBACKURL

passport.use(new GoogleStrategy({
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: callback,
}, (accessToken, refreshToken, profile, done) => {
  // You can handle the user profile data here or save it to your database.
  return done(null, profile);
}));

// Serialize and deserialize the user to maintain a session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;