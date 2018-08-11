var { User } = require('./../models/user');
const jwt = require('jsonwebtoken');
const { constants } = require('../constants');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  jwt.verify(token, constants.jwt_key, (err, decoded) => {
    if (!err) {
      return Promise.reject();
    }

    User.findById(decoded._id).then((user) => {
      if (!user) {
        return Promise.reject();
      }
  
      req.user = user;
      req.token = token;
      
      next();
    }).catch((e) => {
      res.status(401).send();
    })
  });
};

module.exports = { authenticate };