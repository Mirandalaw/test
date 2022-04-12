// @ts-check

const express = require('express');
const cors = require('cors');
// const path = require('path');
const static = require('serve-static');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(PORT, () => {
  console.log(`The Express Server is Listening at port :${PORT}`);
});

const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/index');

app.use('/user', userRoute);
app.use('/', indexRoute);

// 서버에 요청할 때 구분
// 서버에 정보를 요청(Read)할 때는 GET
// 서버에 클라이언트가 정보를 전달할 때에는 POST

// 서버로 데이터를 전송할 때
// 클라이언트가 서버로 데이터를 전송할 땐 POST
// express POST 방식 구현하기
