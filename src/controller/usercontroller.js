const { request } = require("express");
const User = require("../models/user");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.findAll = async (request, response) => {
  try {
    const result = await User.getAllUsers();
    response.status(200).json({ data: result[0] });
  } catch (error) {
    response.json({ error: error.message });
  }
};

exports.getProfile = async (request, response) => {
  const {id} = request.params;
  try {
    const result = await User.getById(id);
    response.status(200).json({ data: result[0] });
  } catch (error) {
    response.json({ error: error.message });
  }
};


exports.creation = async (request, response) => {
  const user = request.body;
  if (user === undefined) {
    response
      .status(400)
      .json({ message: "Veuillez renseigner tous les champs obligatoires" });
  } else {
    // GESTION DES ERREURS DES INPUTS OBLIGATOIRES

    const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (user.email === undefined || user.email === null) {
      response
        .status(400)
        .json({ message: "Veuillez renseigner un email valable" });
    } else if (!regex.test(user.email)) {
      response
        .status(400)
        .json({ message: "Veuillez entrer un email dans un format valide" });
    } else if (
      user.password === undefined ||
      user.password === null ||
      !user.password
    ) {
      response.status(400).json({ message: "Veuillez saisir un mot de passe" });
    } else {
      try {
        const result = await User.getByEmail(user.email);
        if (result[0].length !== 0) {
          response
            .status(409)
            .json({ message: "Un compte existe déja avec l'email renseigné" });
        } else {
          // CREATION DU MOT DE PASSE HASHER
          const saltRounds = parseInt(process.env.SALT_ROUNDS);
          const hash = await bcrypt.hash(user.password, saltRounds);

          // VERIFICATION DES INPUTS NON OBLIGATOIRES
          let nom, prenom, telephone;
          if (user.nom !== undefined && user.nom !== null) {
            nom = user.nom;
          } else {
            nom = "";
          }
          if (user.prenom !== undefined && user.prenom !== null) {
            prenom = user.prenom;
          } else {
            prenom = "";
          }
          if (user.telephone !== undefined && user.telephone !== null) {
            telephone = user.telephone;
          } else {
            telephone = "";
          }
          const newUser = {
            id: uuid.v4(),
            email: user.email,
            password: hash,
            nom: nom,
            prenom: prenom,
            telephone: telephone,
          };
          await User.enregistrer(newUser);
          response.status(201).json({ message: "Création réussie" });
        }
      } catch (error) {
        console.error(error);
        response.json({ message: error.message });
      }
    }
  }
};

//connection
exports.authentification = async (request, response) => {
  if (request.body === undefined) {
    response
      .status(400)
      .json({ message: "Veuillez saisir tous les champs requis" });
  } else {
    const { email, password } = request.body;
    // VERIFICATION DES INPUTS
    const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (email === undefined || email === null) {
      response
        .status(400)
        .json({ message: "Veuillez renseigner un email valable" });
    } else if (!regex.test(email)) {
      response
        .status(400)
        .json({ message: "Veuillez entrer un email dans un format valide" });
    } else if (password === undefined || password === null || password === "") {
      response.status(400).json({ message: "Veuillez saisir un mot de passe" });
    } else {
      // VERIFICATION DE CORRESPONDANCES DES INPUTS AVEC CEUX DE LA BDD
      try {
        const responseUser = await User.getByEmail(email);
        const user = responseUser[0][0];
        if (responseUser[0].length === 0 || user === undefined) {
          response
            .status(409)
            .json({ message: "Aucun compte existe avec cet email" });
        } else {
          const passwordHash = user.password;
          const correct = await bcrypt.compare(password, passwordHash);
          if (!correct) {
            response.status(401).json({ message: "Mot de passe incorrect" });
          } else {
            // LES INPUTS CORRESPONDENT A UN UTILISATEUR
            const newUser = {
              userId: user.id,
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              telephone: user.telephone,
            };
            jwt.sign(newUser, secret, { expiresIn: "24h" }, (error, token) => {
              if (error) {
                console.error(error);
                response.send(error.message);
              } else {
                request.user = {
                    userId: user.id,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    telephone: user.telephone,
                };
                response.status(200).json({
                  token: token,
                  user: newUser,
                });
              }
            });
          }
        }
      } catch (error) {
        console.error(error);
        response.json({ message: error.message });
      }
    }
  }
};
