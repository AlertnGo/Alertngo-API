const express = require('express');
const router = express.Router();
const Voiture = require('../controller/voiturescontroller');

router.get('/', Voiture.findAll);
router.post('/', Voiture.addCar);
router.delete('/', Voiture.deleteOne);
router.patch('/', Voiture.changeOne);

module.exports = router;