const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('ça marche');
});

module.exports = router;