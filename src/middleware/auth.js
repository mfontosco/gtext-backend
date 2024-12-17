const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res
            .status(401)
            .json({ message: 'No token provided or invalid format' });
      }

      const token = authHeader.split(' ')[1]; // Extract the token part
      console.log('Extracted Token: ', token); // Debug: Log the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Extracted Token: ', decoded); // Verify the token
      req.user = decoded; // Attach user data from the token to the request object
      next();
   } catch (error) {
      console.error('Token Verification Error:', error.message); // Debug: Log the error
      res.status(401).json({ message: 'Invalid token' });
   }
};
