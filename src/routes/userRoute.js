// @ts-check

const express = require('express');
const router = express.Router();
// const cors = require('cors');

router.post('/sign-up', async (req, res) => {
  res.status(200).send({ respose: 'SUC' });
});

module.exports = router;
