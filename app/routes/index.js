const express = require('express');
const payments = require('./payments');

const router = express.Router();

router.use('/payments', payments);

module.exports = router;