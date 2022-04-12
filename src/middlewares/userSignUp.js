const signUpCheck = require('../services/signUp');

module.exports = {
  signUp: async (req, res, next) => {
    let signUpCheckResult = await signUpCheck.signUp(req.body, 'user');

    if (signUpCheckResult.respose === 'SUC') next();
    else res.status(500).send(signUpCheckResult);
  },
};
