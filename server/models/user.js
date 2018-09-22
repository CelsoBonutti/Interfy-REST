const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
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
  phone:{
    type: Number,
    required: true
  },
  gender:{
    type: String,
    enum: ['M', 'F', 'O', 'N'],
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  verificationCode: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'name', 'surname', 'phone', 'sexo']);
};

UserSchema.pre('save', function (next) {
  let user = this;
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
  let user = this;
  
  if(user.wasNew){
    const { Transporter } = require('../libs/nodemailer');
    Transporter.sendVerificationMail(user.email, user.verificationCode);
  }
})

UserSchema.statics.activateEmail = function(token){
  let User = this;

  return User.findOne({verificationCode: token, active: false}).then((user)=>{
    user.active = true;
    return user.save();
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;
  
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

let User = mongoose.model('User', UserSchema);

module.exports = { User }
