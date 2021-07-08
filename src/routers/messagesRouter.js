const express = require('express');
const router = express.Router();
const Messages = require('../controller/messagescontroller');

router.get('/', Messages.findAll);


module.exports = router;