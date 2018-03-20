
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../../config');
const users = require('../model/users.js');

exports.ensureAuthenticated = function(req, res, next) {

  if(!req.headers.authorization) {
    return res
      .status(403)
        .send({message: "Sin autorización"});
  }

  const token = req.headers.authorization;
  
  try{
    jwt.decode(token, config.TOKEN_SECRET, false, 'HS512');
  }catch(err){
    return res
      .status(403)
        .send({message: "Token Error!"});
  }
 
  const payload = jwt.decode(token, config.TOKEN_SECRET, false, 'HS512');
  if(payload.exp <= moment().unix()) {
     return res
      .status(401)
        .send({message: "El token ha expirado"});
  }

  users.findById(payload.sub, function(err, user) {
    if (!user) {
      return res
        .status(403)
          .send({message: "Sin autorización"});
    }
  });

  req.users = payload.sub;
  next();
}

