const { request } = require('express');
const Voiture = require('../models/voiture');
const uuid = require('uuid');

exports.findAll = async (request, response) => {
    try{
        const result = await Voiture.getAllVoitures();
        response.status(200).json({ data: result[0] })
    } catch(error){
        response.json({ error: error.message });   
    }
}

exports.addCar = async (request, response) => {
    const id = uuid.v4();
    const {ndp , userid } = request.body;
    try{
        await Voiture.postMyCar(id , ndp , userid);
        const result = await Voiture.getAllVoitures();
        response.status(201).json(result[0]);
    } catch(error){
        response.json(error.message);   
    }
}

exports.deleteOne = async (request, response) => {
    const {id} = request.body;
    try{
        await Voiture.deleteMYCar(id);
        const result = await Voiture.getAllVoitures();
        response.status(201).json(result[0]);
    } catch(error){
        response.json({ error: error.message });   
    }
}

exports.changeOne = async (request, response) => {
    const {id,ndp} = request.body;
    try{
        await Voiture.changeMYCar(ndp,id);
        response.status(200).json({ message: 'Prix modifié avec succès' });
    } catch(error){
        response.json({ error: error.message });   
    }
}