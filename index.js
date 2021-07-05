
const server = require('./src/server')
require('dotenv').config()

server.listen(process.env.APP_PORT, () => {
    console.log('Server running at port', process.env.APP_PORT);
  });