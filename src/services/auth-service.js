const User = require('../models/users');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.register = async ({ username, password, role }) => {
   const user = new User({ username, password, role });
   await user.save();
   return { id: user._id, username: user.username, role: user.role };
};

exports.login = async ({ username, password }) => {
   const user = await User.findOne({ username });
   if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
   }
   return {
      message: 'login successful',
      token: generateToken({ id: user._id, role: user.role }),
   };
};
