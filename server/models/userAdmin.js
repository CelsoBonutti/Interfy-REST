const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: function(email){
        return validator.isEmail(email);
      },
      message: '{VALUE} não é um e-mail válido.'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

AdminSchema.methods.toJSON = function () {
  var admin = this;
  var adminObject = admin.toObject();

  return _.pick(adminObject, ['_id', 'email']);
};

AdminSchema.methods.removeToken = function(token) {
  var admin = this;

  return admin.update({
    $pull:{
      tokens: {token}
    }
  })
}

AdminSchema.methods.generateAuthToken = function () {
  var admin = this;
  var access = 'auth';
  var token = jwt.sign({ _id: admin._id.toHexString(), access }, '_mDGncO87k0&8PGg|KIJZkplhWStomLtWe+C5e6dTkNd7seQ9*tQ^HJXSTeb!-QG#pV#t51*RYhzUHsdA%v9wyV|gtUk$YN&iKIK4lMUooOLsDzvN^j|quHziWtRdXpo').toString();

  admin.tokens = admin.tokens.concat([{ access, token }]);

  return admin.save().then(() => {
    return token;
  });
};

AdminSchema.pre('save', function (next) {
  var admin = this;

  if (admin.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, (err, hash) => {
        admin.password = hash;
        next();
      })
    })
  }
  else {
    next();
  }
})

AdminSchema.statics.findByCredentials = function (email, password) {
  var Admin = this;

  return Admin.findOne({ email }).then((admin) => {
    if (!admin) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, admin.password, (err, res) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(admin);
        }
      })
    })
  })
};

AdminSchema.statics.findByToken = function (token) {
  var Admin = this;
  var decoded;

  try {
    decoded = jwt.verify(token, '_mDGncO87k0&8PGg|KIJZkplhWStomLtWe+C5e6dTkNd7seQ9*tQ^HJXSTeb!-QG#pV#t51*RYhzUHsdA%v9wyV|gtUk$YN&iKIK4lMUooOLsDzvN^j|quHziWtRdXpo');
  }
  catch (e) {
    return Promise.reject();
  }

  return Admin.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = { Admin }
