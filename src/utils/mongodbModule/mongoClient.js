var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var uri = process.env.MONGO_URI;

let mongoModule = {
  /**
   * choose collection, find all data
   *  @param {String} collectionName - Input name of the collection
   *  @returns Promise
   */
  mongoSelectAll: (collectionName) => {
    return new Promise((resolve, reject) => {
      let data = new Array();
      MongoClient.connect(uri, async (err, database) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('db on...');
          var cursor = database.db('MJJMALL').collection(collectionName).find();
          await cursor.forEach((doc) => {
            data.push(doc);
          });
          console.log('데이터베이스 닫겠습니다.');
          database.close();
          resolve(data);
        }
      });
    });
  },
  mongoSelectOne: (collectionName, queryObj, optionsObj) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, async (err, database) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('db on...');
          var res_arr = new Array();
          var result = database
            .db('MJJMALL')
            .collection(collectionName)
            .find(queryObj, optionsObj)
            .limit(1);
          await result.forEach((doc) => {
            res_arr.push(doc);
          });
          console.log('데이터베이스 닫겠습니다.');
          database.close();
          resolve(res_arr[0]);
        }
      });
    });
  },

  mongodbInsertOne: (collectionName, jsonObj) => {
    MongoClient.connect(uri, (err, database) => {
      if (err) console.log(err);
      else {
        console.log('db on...');
        database
          .db('MJJMALL')
          .collection(collectionName)
          .insertOne(jsonObj, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(collectionName + '1 Document Insert');
            }
            database.close();
          });
      }
    });
  },
  mongoInsertMany: function (collectionName, jsonObj) {
    MongoClient.connect(uri, function (err, database) {
      if (err) console.log(err);
      else {
        database
          .db('MJJMALL')
          .collection(collectionName)
          .insertMany(jsonObj, function (err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(collectionName + ' Documents Insert');
            }
            console.log('데이터베이스 닫겠습니다.');
            database.close();
          });
      }
    });
  },
};

module.exports = mongoModule;
