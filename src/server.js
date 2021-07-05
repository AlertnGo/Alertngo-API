const express = require('express');
require('dotenv').config()
const cors = require('cors');

// const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const router = require('./routers');

const server = express();

server.use(morgan('dev'));
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(cookieParser());

server.use('/api', router);

module.exports = server;