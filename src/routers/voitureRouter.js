const express = require('express');
const router = express.Router();
const Voiture = require('../controller/voiturescontroller');

// router.get('/', Voiture.findAll);
router.get('/:ndp', Voiture.findNum);
router.post('/', Voiture.addCar);
router.delete('/:id', Voiture.deleteOne);
router.patch('/', Voiture.changeOne);

module.exports = router;