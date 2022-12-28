const jwt = require('jsonwebtoken');

// General middleware for users and admins

module.exports = (req, res, next) => {
  // getting the token from the header
  const token = req.header('x-auth-token');
  // checking if the token exists
  if (!token) {
    return res.status(401).json({ msg: 'NO token, unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
