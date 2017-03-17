const express = require('express');
const router = express.Router();
const charge = require('./charge');

router.use('/charge', charge);

module.exports = router;