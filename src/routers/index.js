const express = require('express');
const router = express.Router();

const voitures = require('./voitureRouter');
const users = require('./userRouter');
const messages = require('./messagesRouter');

router.get('/', (req, res) => {
    res.send('ça marche le api');
});
router.use('/voitures', voitures);
router.use('/user', users);
router.use('/messages', messages);








module.exports = router;