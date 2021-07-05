const { request } = require('express');
const Voiture = require('../models/voiture');

exports.findAll = async (request, response) => {
    try{
        const result = await Voiture.getAllVoitures();
        response.status(200).json({ data: result[0] })
    } catch(error){
        response.json({ error: error.message });   
    }
}