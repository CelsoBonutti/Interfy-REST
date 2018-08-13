const { verifyJWToken } = require('../libs/auth');

let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  verifyJWToken(token).then((decoded) =>{
    req.id = decoded.sub;
    req.isAdmin = decoded.admin;
    req.name = decoded.name;
    req.surname = decoded.surname;
    next();
  }).catch((err) =>{
    res.status(400).json({message: "Token inválido."});
  })
};

module.exports = { authenticate };