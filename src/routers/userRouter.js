const express = require('express');
const router = express.Router();
const User = require('../controller/usercontroller');

router.get('/', User.findAll);
router.post('/', User.creation);

module.exports = router;