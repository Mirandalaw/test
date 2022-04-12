const jwt = require('../utils/jwtModule/jwt');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const auth = {
  // eslint-disable-next-line consistent-return
  checkToken: async (req, res, next) => {
    // eslint-disable-next-line prefer-destructuring
    const token = req.headers.token;
    // 토큰 없음
    if (!token) return res.json();
    // decode
    const user = await jwt.verify(token);
    // 유효기간 만료
    if (user === TOKEN_EXPIRED) return res.json();
    // 유효하지 않는 토큰
    if (user === TOKEN_INVALID) return res.json();

    if (user.idx === undefined) return res.json();

    req.idx = user.idx;
    next();
  },
};

module.exports = auth;
