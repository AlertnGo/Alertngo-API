const { request } = require("express");
const Voiture = require("../models/voiture");
const uuid = require("uuid");

exports.findAll = async (request, response) => {
  try {
    const result = await Voiture.getAllVoitures();
    response.status(200).json({ data: result[0] });
  } catch (error) {
    response.json({ error: error.message });
  }
};

exports.findNum = async (request, response) => {
  const { ndp } = request.params;
  // console.log(request);
  try {
    const result = await Voiture.getUserInfo(ndp);
    response.status(200).json({ data: result[0] });
  } catch (error) {
    response.json({ error: error.message });
  }
};

exports.addCar = async (request, response) => {
  const id = uuid.v4();
  const {ndp, userid } = request.body;
  try {
    const result = await Voiture.getByNdp(ndp);
    if (result[0].length !== 0) {
      response.status(409).json({ message: "Un voiture existe déja" });
    } else {
      await Voiture.postMyCar(id, ndp, userid);
      const data = await Voiture.getByNdp(ndp)
      response.status(201).json(data[0]);
    }
  } catch (error) {
    response.json(error.message);
  }
};

exports.deleteOne = async (request, response) => {
  const { id } = request.body;
  try {
    await Voiture.deleteMYCar(id);
    response
      .status(200)
      .json({ message: "Numero de plaque d'immatriculation a bien suprimé" });
  } catch (error) {
    response.json({ error: error.message });
  }
};

exports.changeOne = async (request, response) => {
  const { id, ndp } = request.body;
  try {
    await Voiture.changeMYCar(ndp, id);
    response
      .status(200)
      .json({
        message: "Numero de plaque d'immatriculation a modifié avec succès",
      });
  } catch (error) {
    response.json({ error: error.message });
  }
};
