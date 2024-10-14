const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');  // Import mongoose
const Banner = require('./models/banners');  // Import the Banner model
const Product = require('./models/products');  // Import the Product model

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(multipart())
// Use environment variables for MongoDB URI and port
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8080;
console.log(uri)


const routes = require('./routes/routes')
app.use('/', routes)

// Connect to MongoDB

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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
