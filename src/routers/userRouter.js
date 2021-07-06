const express = require('express');
const router = express.Router();
const User = require('../controller/usercontroller');

router.get('/', User.findAll);
router.post('/signup', User.creation);
router.post('/login', User.authentification);

module.exports = router;