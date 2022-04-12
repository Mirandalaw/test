const userDb = require('../models/user');

module.exports = {
  /**
   * [codeName = collectionName]
   * [user]
   *
   * @param {Object} jsonObj
   * @param {String} codeName
   * @returns
   */

  signUp: async (jsonObj, codeName) => {
    if (codeName === 'user') return userDb.signUp(jsonObj);
  },
};
