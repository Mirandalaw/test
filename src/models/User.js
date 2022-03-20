// @ts-check
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    age: Number,
    email: String,
    // timestamps : 언제 생성됐는지 .
  },
  { timestamps: true }
);

// user라는 collection을 만들꺼야 UserSchema라는 데이터 형태를 가지고 있어.
const User = model('user', UserSchema);
module.exports = { User };
