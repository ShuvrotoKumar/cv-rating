const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.split(' ')[1] || req.header('x-auth-token');

  // If running in in-memory sandbox mode, let requests pass gracefully even without tokens
  const isMockMode = !process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb');

  if (!token) {
    if (isMockMode) {
      // Mock authenticated admin user for demonstration
      req.user = { id: 'mock_user_1', role: 'admin' };
      return next();
    }
    return res.status(401).json({ message: 'No authorization token, access restricted.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_token_123');
    req.user = decoded.user;
    next();
  } catch (err) {
    if (isMockMode) {
      req.user = { id: 'mock_user_1', role: 'admin' };
      return next();
    }
    res.status(401).json({ message: 'Token is invalid' });
  }
};
