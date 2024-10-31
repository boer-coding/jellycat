const multipart = require('connect-multiparty');
const multipartMiddleware = multipart(); // Add options if needed

module.exports = multipartMiddleware;