var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if(env === 'development'){
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/dev';
}else if(env === 'test'){
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/test'
}

//Bibliotecas
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const jwt = require('jsonwebtoken');
var {ObjectId} = require('mongodb');

//Models
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {Instituicao} = require('./models/ies');
var {Curso} = require('./models/curso');


//Middleware
var {authenticate} = require('./middleware/authenticate')

var app = express();

app.use(bodyParser.json());

app.post('/users/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() =>{
    return user.generateAuthToken();
  }).then((token) =>{
    res.header('x-auth', token).send(user);
  }).catch((e) =>{
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate,(req, res) =>{
  res.send(req.user);
})

app.post('/users/login', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) =>{
    return user.generateAuthToken().then((token) =>{
      res.header('x-auth', token).send(user);
    });
  }).catch((e) =>{
    res.status(400).send();
  })
})

app.delete('/users/login', (req, res)=>{
  
})

app.get('/escolas', (req, res)=>{
  var listaEscolas = Instituicao.findByFilter(filter);
  res.send(listaEscolas).status(200);
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};