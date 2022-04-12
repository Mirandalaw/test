const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const secretKey = require('../../config/secretKey').secretKey;
const options = require('../../config/secretKey').options;
const accessOptions = require('../../config/secretKey').accessOption;
const refreshOptions = require('../../config/secretKey').refreshOption;

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: async (user) => {
    const payload = {
      idx: user.userIdx,
      email: user.email,
    };
    const result = {
      token: jwt.sign(payload, secretKey, options),
      refreshToken: randToken.uid(256),
    };
    return result;
  },
  verify: async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log('invalid token');
        return TOKEN_INVALID;
      }
    }
    console.log(decoded);
    return decoded;
  },
};
