const express = require('express');
const router = express.Router();
const User = require('../controller/usercontroller');

router.get('/', User.findAll);

module.exports = router;