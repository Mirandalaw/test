const jwt = require('jsonwebtoken');
require('dotenv').config;

const secretKey = process.env.ACCESS_TOKEN_SECRET;

route.post('/login', (req, res, next) => {
  const userId = req.body.userId;
  const birth = req.body.birth;

  token = jwt.sign(
    {
      type: 'JWT',
      id: id,
      birth: birth,
    },
    secretKey,
    {
      expiresIn: '15m',
      issuer: '토큰발급자',
    }
  );
  return res.staus(200).json({
    code: 200,
    message: '토큰이 발급되었습니다',
    token: token,
  });
});
