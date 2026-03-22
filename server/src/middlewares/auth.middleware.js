import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ success: false, message: 'Please login to access this resource' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found or token invalid' });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized: ' + error.message });
  }
};
