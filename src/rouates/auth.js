const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ensureAuthenticated = require('../middleware/auth/authmiddle'); // Import the authentication middleware
const v2rouates=require('./v2')
const app = express();

// ... Other configurations and middleware ...

let secert=process.env.SECRET
let clientId=process.env.CLIENTID
let clientSecret= process.env.CLIENTSECRET
let callback=process.env.CALLBACKURL
// Configure session
app.use(session({
  secret: secert,
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Google Strategy
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

// ... Define your routes ...
app.use('/v2',ensureAuthenticated,v2rouates)
// Protected route example
// app.get('/dashboard', ensureAuthenticated, (req, res) => {
//   // This route is protected and can only be accessed by authenticated users.
//   // You can access the user's profile data from req.user here.
//   res.send(`Welcome to your dashboard, ${req.user.displayName}!`);
// });

// Start the server
module.exports = router