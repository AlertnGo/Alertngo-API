const express = require('express');
const router = express.Router();
const User = require('../controller/usercontroller');

router.get('/', User.findAll);
router.patch('/name/:id', User.changeName);
router.patch('/theme/:id', User.setTheme);
router.get('/:id', User.getProfile);
router.get('/cars/:id', User.getMyVehicle);
router.post('/signup', User.creation);
router.post('/login', User.authentification);

module.exports = router;