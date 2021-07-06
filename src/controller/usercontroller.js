const { request } = require('express');
const User = require('../models/user');
const uuid = require('uuid');

exports.findAll = async (request, response) => {
    try{
        const result = await User.getAllUsers();
        response.status(200).json({ data: result[0] })
    } catch(error){
        response.json({ error: error.message });   
    }
}

