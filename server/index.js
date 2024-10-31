const express = require('express');
const dotenv = require('dotenv');
const passport = require('./config/passport'); // Import Passport configuration
const sessionMiddleware = require('./config/session');
const corsMiddleware = require('./config/cors');
const multipartMiddleware = require('./config/multipart');
const connectDB = require('./config/db');

// Load environment variables from the .env file
dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Import session configuration from the config folder
app.use(sessionMiddleware);  // Use session middleware
// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(multipartMiddleware);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
const bannerRoutes = require('./routes/bannerRoutes')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')

app.use('/', bannerRoutes)
app.use('/', productRoutes)
app.use('/', authRoutes)
app.use('/', cartRoutes)

// Connect to MongoDB
connectDB();

// Use environment variables for MongoDB URI and port
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
