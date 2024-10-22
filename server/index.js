const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');  // Import mongoose
const cookieParser = require('cookie-parser');
const session = require ('express-session')
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local');


// Load environment variables from the .env file
dotenv.config();

const app = express();
// Use CORS middleware to allow cross-origin requests
app.use(cors());


// session
const sessionConfig = {
  secret: 'this should be better',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24
  }

}
app.use(session(sessionConfig))
app.use(flash());

app.use((req, res, next) =>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');

  next();
})
app.get('/set-session', (req, res) => {
  req.session.user = { username: 'Boer', role: 'admin' };
  res.send('Session has been set.');
});

// Get the session value
app.get('/get-session', (req, res) => {
  if (req.session.user) {
    res.send(`Session Data: ${req.session.user.username}, Role: ${req.session.user.role}`);
  } else {
    res.send('No session data found.');
  }
});

// Destroy the session
app.get('/destroy-session', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error destroying session');
    }
    res.send('Session destroyed.');
  });
});

// use passport for password
app.use(passport.initialize());
app.use(passport.session());

const multipart = require('connect-multiparty')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multipart())
// Use environment variables for MongoDB URI and port
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8080;


const productRoutes = require('./routes/productRoutes')
app.use('/', productRoutes)

// Connect to MongoDB

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to the jellycat database');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  

  


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
