var MongoClient = require('mongodb').MongoClient;

// eslint-disable-next-line no-unused-expressions
require('dotenv').config();

var url = process.env.MONGO_URL;

let mongoModule = {
  /**
   * choose collection, find all data
   *  @param {String} collectionName - Input name of the collection
   *  @returns Promise
   */
  mongoSelectOne: (collectionName, queryObj, optionsObj) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, async (err, database) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          var res_arr = new Array();
          var result = database
            .db('MJJMALL')
            .collection(collectionName)
            .find(queryObj, optionsObj)
            .limit(1);
          await result.forEach((doc) => {
            res_arr.push(doc);
          });
          resolve(res_arr[0]);
        }
      });
    });
  },
  mongoSelectAll: (collectionName) => {
    return new Promise((resolve, reject) => {
      let data = new Array();
      MongoClient.connect(url, async (err, database) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          var cursor = database.db('MJJMALL').collection(collectionName).find();
          await cursor.forEach((doc) => {
            data.push(doc);
          });

          database.close();
          resolve(data);
        }
      });
    });
  },
  mongodbInsertOne: (collectionName, jsonObj) => {
    MongoClient.connect(url, (err, database) => {
      if (err) console.log(err);
      else {
        database
          .db('MJJMALL')
          .collection(collectionName)
          .insertOne(jsonObj, (err, res) => {
            if (err) console.log(err);
            else console.log(collectionName + '1 Document Insert');
            database.close();
          });
      }
    });
  },
};

module.exports = mongoModule;
