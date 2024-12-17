const jwt = require('jsonwebtoken');

const generateToken = (data) => {
   return jwt.sign({ ...data }, process.env.JWT_SECRET, {
      expiresIn: '7days',
   });
};

module.exports = generateToken;
