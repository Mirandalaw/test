const mongodb = require('../utils/mongodbModule/mongoClient');

const signUp = async (jsonObj) => {
  var indexOptions = {
    sort: ['index', 'desc'],
  };
  var queryOptions = {
    memberId: jsonObj.memberId,
  };

  let result = new Object();

  await mongodb
    .mongoSelectOne('member', queryOptions, {})
    .then((selectResult) => {
      if (selectResult.lenght != 0) {
        result.response = 'Failed';
      } else {
        mongodb.mongodbInsertOne('member', jsonObj);
        result.response = 'Suc';
      }
    })
    .catch((err) => {
      result.response = 'Failed';
      result.error = err;
    });
  return result;
};
