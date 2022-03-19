// @ts-check

const express = require('express');
const app = express();
const PORT = 5000;
app.get('/', (req, res) => {
  res.send('test');
});
app.listen(PORT, () => {
  console.log(`The Express Server is Listening at port ${PORT}`);
});
