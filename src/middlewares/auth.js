const jwt = require('jsonwebtoken');

const secretKey = require('dotenv').config.ACCESS_SECRET_KEY;

exports.auth = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, secretKey);
    return next();
  } catch (err) {
    if (err === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다.',
      });
    }
  }
};
