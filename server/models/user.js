const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const { constants } = require('../constants');

var UserSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  telefone:{
    type: Number,
    required: true
  },
  genero:{
    type: String,
    required: true,
    validate:{
      validator: function(sexo){
        return validator.isIn(sexo, ['M', 'F', 'O', 'N'])
      },
      message: '{VALUE} não é um valor de sexo válido.'
    },
    maxlength: 1,
    minlength: 1
  },
  active: {
    type: Boolean,
    required: true
  },
  verificationCode: {
    type: String,
    required: false
  }
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'name', 'surname', 'telefone', 'sexo']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id, access, exp: Date.now().toString() }, constants.jwt_key).toString();

  return token;
}


UserSchema.pre('save', function (next) {
  var user = this;
  user.wasNew = user.isNew;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  }
  else {
    next();
  }
})

UserSchema.post('save', function(next){
  var user = this;
  
  if(user.wasNew){
    const { Transporter } = require('../db/nodemailer');

  }
})

UserSchema.statics.activateEmail = function(token){
  var User = this;

  return User.findOne({verificationCode: token, active: false}).then((user)=>{
    user.active = true;
    return user.save();
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(user);
        }
      })
    })
  })
}

var User = mongoose.model('User', UserSchema);

module.exports = { User }
