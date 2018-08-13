const jwt = require('jsonwebtoken');
const _ = require('lodash');

function verifyJWToken(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if (err || !decoded){
                return reject(err);
            }
            resolve(decoded);
        })
    })
};

function createJWToken(details){
    if (typeof details !== 'object'){
        details = {};
    }

    let token = jwt.sign({
        sub: details._id,
        name: details.name,
        surname: details.surname,
        admin: details.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        issuer: 'api.interfy.com.br',
        audience: 'interfy.com.br'
    })

    return token;
};

module.exports = {
    verifyJWToken,
    createJWToken
  };
  