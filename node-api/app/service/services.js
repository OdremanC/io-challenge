// services.js
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../../config');
//Genera el jwt para el usuario logeado
exports.createToken = function(users) {
  
  var payload = {
    sub: users._id,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET, 'HS512');
};