const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

const sessionConfig = {
  name: 'jelly',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7            // Allow cookies across different origins
  }
};

module.exports = session(sessionConfig);

