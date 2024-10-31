// const cors = require('cors');

// // CORS configuration to allow credentials from any origin
// const corsOptions = {
//     origin: (origin, callback) => {
//       // Allow requests from any origin
//       callback(null, origin || '*');
//     },
//     credentials: true,  // Allow cookies and credentials
//   };
  
// module.exports = cors(corsOptions);
const cors = require('cors');

// CORS configuration with specific allowed origin
const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend origin
  credentials: true                 // Allow credentials (cookies)
};

module.exports = cors(corsOptions);
