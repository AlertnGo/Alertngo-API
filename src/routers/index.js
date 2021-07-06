const express = require('express');
const router = express.Router();

const voitures = require('./voitureRouter');
const users = require('./userRouter');

router.get('/', (req, res) => {
    res.send('ça marche le api');
});
router.use('/voitures', voitures);
router.use('/user', users);






module.exports = router;