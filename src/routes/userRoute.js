// @ts-check

const express = require('express');

const router = express.Router();
// const cors = require('cors');

router.get('/', (req, res) => {
  res.send('Hello');
});

module.exports = router;
