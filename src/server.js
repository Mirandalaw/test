// @ts-check

const express = require('express');
const mongoose = require('mongoose');
// models/Users.js에서 const User를 가져옴
const { User } = require('./models/User');
require('dotenv').config();

const app = express();

const users = [];

const { MONGO_URI } = process.env;
console.log(MONGO_URI);
const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDb is Connected');
    app.use(express.json());

    app.get('/user', (req, res) => {
      /* eslint arrow-body-style: ["error", "always"] */
      /* eslint-env es6 */
      // return res.send({ users: users });
    });

    // eslint-disable-next-line consistent-return
    app.post('/user', async (req, res) => {
      // mongoose 인스턴스를 만들어주고
      try {
        // let username = req.body.username
        // let name = req.body.name;
        const { username, name } = req.body;
        if (!username)
          return res.status(400).send({ err: 'username is required' });
        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ err: 'Both first and last names are required' });
        const user = new User(req.body);
        await user.save();
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });
    app.listen(5000, () => {
      console.log(`The Express Server is Listening at port 5000`);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
