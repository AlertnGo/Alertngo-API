const { request } = require('express');
const User = require('../models/user');
const uuid = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.findAll = async (request, response) => {
    try{
        const result = await User.getAllUsers();
        response.status(200).json({ data: result[0] })
    } catch(error){
        response.json({ error: error.message });   
    }
}

exports.creation = async (request, response) => {
    const user = request.body;
    if (user === undefined) {
        response.status(400).json({message: "Veuillez renseigner tous les champs obligatoires"})
    } 
    else {
            // GESTION DES ERREURS DES INPUTS OBLIGATOIRES
        
            const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
            if (user.email === undefined || user.email === null) {
                response.status(400).json({message: "Veuillez renseigner un email valable"})
            }
            else if (!(regex.test(user.email))){
                response.status(400).json({message: "Veuillez entrer un email dans un format valide"})
            }
            else if (user.password === undefined || user.password === null || !user.password) {
                response.status(400).json({message: "Veuillez saisir un mot de passe"})
            }
            else {
                try {
                    const result = await User.getByEmail(user.email);
                    if (result[0].length !== 0) {
                        response.status(409).json({message: "Un compte existe déja avec l'email renseigné"})
                    }
                    else {
                        // CREATION DU MOT DE PASSE HASHER
                        const saltRounds = parseInt(process.env.SALT_ROUNDS);
                        const hash = await bcrypt.hash(user.password, saltRounds)
        
                        // VERIFICATION DES INPUTS NON OBLIGATOIRES
                        let nom, prenom, telephone;
                        if (user.nom !== undefined && user.nom !== null) {
                            nom = user.nom
                        }
                        else{
                            nom=""
                        }
                        if (user.prenom !== undefined && user.prenom !== null) {
                            prenom = user.prenom
                        }
                        else{
                            prenom=""
                        }
                        if (user.telephone !== undefined && user.telephone !== null) {
                            telephone = user.telephone
                        }
                        else{
                            telephone="";
                        }
                        const newUser = {
                            id : uuid.v4(),
                            email: user.email,
                            password: hash,
                            nom: nom,
                            prenom: prenom,
                            telephone:telephone,
                        }
                        await User.enregistrer(newUser);
                        response.status(201).json({message: "Création réussie"});
                    }
                }
                catch (error) {
                    console.error(error);
                    response.json({message: error.message});
                }
            }
    }
}

