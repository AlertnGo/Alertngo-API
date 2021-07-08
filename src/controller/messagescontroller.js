const { request } = require('express');
const Messages = require('../models/messages');


exports.findAll = async (request, response) => {
    try {
      const result = await Messages.getAllMessages();
      response.status(200).json({ data: result[0] });
    } catch (error) {
      response.json({ error: error.message });
    }
  };