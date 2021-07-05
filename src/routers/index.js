const express = require('express');
const router = express.Router();

const voitures = require('./voitureRouter');

router.get('/', (req, res) => {
    res.send('ça marche le api');
});
router.use('/voitures', voitures);






module.exports = router;