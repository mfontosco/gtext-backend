const authService = require('../services/auth-service');

exports.register = async (req, res) => {
   try {
      const user = await authService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

exports.login = async (req, res) => {
   try {
      const token = await authService.login(req.body);
      res.json({ token });
   } catch (err) {
      res.status(401).json({ message: err.message });
   }
};
