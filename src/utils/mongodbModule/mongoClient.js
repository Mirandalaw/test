const { MongoClient } = require('mongodb');

const mongoClient = require('mongodb').MongoClient;

// eslint-disable-next-line no-unused-expressions
require('dotenv').config();

const url = process.env.MONGO_URL;

let mongoModule = {
  /**
   * choose collection, find all data
   *  @param {String} collectionName - Input name of the collection
   *  @returns Promise
   */

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
};
