const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://jellycat-frontend-d44f779084b9.herokuapp.com'],
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));