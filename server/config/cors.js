// const cors = require('cors');

// // CORS configuration to allow credentials from any origin
// const corsOptions = {
//   origin: 'http://localhost:3000',  // Frontend origin
//   credentials: true                 // Allow credentials (cookies)
// };
  
// module.exports = cors(corsOptions);
const cors = require('cors');

// CORS configuration with specific allowed origin
// const corsOptions = {
//   origin: 'http://localhost:3000',  // Frontend origin
//   credentials: true                 // Allow credentials (cookies)
// };

const corsOptions = {
  origin: ['http://localhost:3000', 'https://jellycat-frontend-d44f779084b9.herokuapp.com'],
  credentials: true,  // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  exposedHeaders: ['Set-Cookie'], // Expose 'Set-Cookie' header to client
};

module.exports = cors(corsOptions);
