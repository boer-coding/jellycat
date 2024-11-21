const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const sessionConfig = {
  name: "jelly", // Custom name for the session cookie to avoid default 'connect.sid'
  secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie to ensure integrity
  resave: false, // Prevents saving the session back to the store if it hasn’t been modified during the request.
  saveUninitialized: false, // Avoids creating and storing empty sessions for unauthenticated or inactive users.
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // MongoDB connection URI for storing session data
    collectionName: "sessions", // Name of the MongoDB collection where session data will be stored
  }),
  cookie: {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie (enhances security)
    expires: Date.now() + 1000 * 60 * 60 * 24, // Sets cookie expiration to 1 day from the current time
    maxAge: 1000 * 60 * 60 * 24, // Maximum age of the cookie in milliseconds (1 day)
    sameSite: "none", // Allows the cookie to be sent across different origins (e.g., for cross-site requests)
    secure: true, // Ensures the cookie is sent only over HTTPS for added security
  },
};




module.exports = session(sessionConfig);
