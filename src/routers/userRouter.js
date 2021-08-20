const express = require('express');
const router = express.Router();
const User = require('../controller/usercontroller');
const { isAuth } = require('../middleware/authenticate');

router.post('/signup', User.creation);


router.get('/', User.findAll);
router.patch('/name/:id',isAuth, User.changeName);
router.patch('/telephone/:id',isAuth , User.changeNum);
router.patch('/theme/:id', User.setTheme);
router.get('/:id', isAuth , User.getProfile);
router.get('/cars/:id', User.getMyVehicle);
router.post('/login', User.authentification);

module.exports = router;