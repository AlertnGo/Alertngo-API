const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

exports.isAuth = (request, response, next) => {
  // const token = request.cookies.authcookie; // Appels via Postman
  const token = request.headers.authorization.split('Bearer ')[1]; // Appels normaux
  jwt.verify(token, SECRET, (error, user) => {
    if (error) {
      response.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource' });
    }
    else {
      const {
        name, exp, id
      } = user;

      // Useless or not ?!
      if (Date.now() / 1000 >= exp) {
        response.clearCookie('authcookie');
        response.send('Session expired. Try to reconnect you.');
      }
      request.user = { name, id };
      next();
    }
  });
};