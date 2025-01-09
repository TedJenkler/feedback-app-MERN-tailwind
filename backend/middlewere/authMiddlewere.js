const jwt = require('jsonwebtoken');

const authMiddlewere = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'You need to login' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'You need to login' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error('Authentication error', err);
    res.status(401).json({ message: 'You need to login' });
  }
};

module.exports = authMiddlewere;
