// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import your User model

// Local Strategy using email and password
passport.use(new LocalStrategy({
    usernameField: 'email',    // Use 'email' instead of 'username'
    passwordField: 'password'  // Keep password field as is
}, User.authenticate())); 

// Serialize and deserialize user (for session support)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
