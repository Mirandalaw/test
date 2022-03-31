// @ts-check

const express = require('express');
const mongoose = require('mongoose');
// models/Users.js에서 const User를 가져옴
const { User } = require('./models/User');
require('dotenv').config();

const app = express();

const { MONGO_URI } = process.env;
const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    // mongoose가 내부적으로 어떤 일을 하는지 알려주는 코드.
    mongoose.set('debug', true);
    console.log('MongoDb is Connected');
    app.use(express.json());

    app.get('/user', async (req, res) => {
      try {
        // User.find({}) => 다수의 유저를 불러옴
        const users = await User.find({});
        /* eslint arrow-body-style: ["error", "always"] */
        /* eslint-env es6 */
        return res.send({ users });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });
    // :userID <<<  userId를 변수로 받을 수 있음
    app.get('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        // 만약 ObjectId 가 ObjectId형식이 아닐경우 유저가 잘못 입력한 경우임을 catch후 400err처리
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: 'invaild userId' });
        const user = await User.findOne({ _id: userId });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
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

    app.delete('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: 'invaild userId' });
        // deleteOne을 사용해도 됨 더효율적일 수도 있음 findOneAndDelete경우 유저 정보를 보여주고 삭제하는 것
        const user = await User.findOneAndDelete({ _id: userId });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.put('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: 'invaild userId' });
        const { age } = req.body;
        if (!age) return res.status(400).send({ err: 'age is required' });
        if (typeof age !== 'number')
          return res.status(400).send({ err: 'age must be a number' });
        // findById userId를 그냥 써줘도됨
        const user = await User.findByIdAndUpdate(
          userId,
          { $set: { age } },
          // new : true 를 사용하면 업데이트 이후의 데이터를 보여줌
          { new: true }
        );
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
// pjh

server();
