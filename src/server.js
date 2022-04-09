// @ts-check

const express = require('express');
const cors = require('cors');
// const path = require('path');
// const static = require('serve-static');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`The Express Server is Listening at port :${PORT}`);
});

const userRoute = require('./routes/userRoute');

app.use('/user', userRoute);
