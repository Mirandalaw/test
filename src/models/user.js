// const mongodb = require('../utils/mongodbModule/mongoClient');

// module.exports = {
//   /**
//    * signUp user
//    *
//    * @param {Object} jsonObj
//    * @returns
//    */
//   signUp: async (jsonObj) => {
//     var indexOptions = {
//       sort: ['index', 'desc'],
//     };

//     var queryOptions = {
//       memberId: jsonObj.memberId,
//     };

//     let result = new Object();

//     await mongodb
//       .mongoSelectOne('member', {}, indexOptions)
//       .then(function (selectResult) {
//         try {
//           jsonObj.index = selectResult.index;
//           jsonObj.index++;
//         } catch (error) {
//           jsonObj.index = 1;
//         }
//       })
//       .catch(function (err) {
//         //mongoDB 에러시
//         result.response = 'FAILED';
//         result.error = err;
//       });

//     await mongodb
//       .mongoSelectOne('member', queryOptions, {})
//       .then(function (selectResult) {
//         if (selectResult.length != 0) {
//           result.response = 'FAILED';
//         } else {
//           mongodb.mongoInsertOne('member', jsonObj);
//           result.response = 'SUC';
//         }
//       })
//       .catch(function (err) {
//         //mongoDB 에러시
//         result.response = 'FAILED';
//         result.error = err;
//       });

//     return result;
//   },
// };
