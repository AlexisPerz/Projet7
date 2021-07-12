const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, '88a820b06fbd2ac07d17771ac180c60f');
      next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};