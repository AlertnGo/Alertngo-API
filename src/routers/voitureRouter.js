const express = require('express');
const router = express.Router();
const Voiture = require('../controller/voiturescontroller');

router.get('/', Voiture.findAll);

module.exports = router;