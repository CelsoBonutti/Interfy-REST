var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if (env === 'development') {
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/dev';
} else if (env === 'test') {
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/test'
}

//Bibliotecas
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const jwt = require('jsonwebtoken');
var { ObjectID } = require('mongodb');

//Models
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Instituicao } = require('./models/ies');
var { Curso } = require('./models/curso');
var { Informacoes } = require('./models/informacoesUsuario');
var { Intercambios } = require('./models/intercambios');

//Middleware
var { authenticate } = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/users/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'nome', 'sobrenome', 'telefone', 'sexo']);
  body.isAdmin = false;
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

app.get('/info/me', authenticate, (req, res) => {
  Informacoes.findByUserId(req.user._id).then((informacoes) => {
    res.status(200).send(informacoes);
  }, () => {
    res.status(400).send();
  })
})

app.patch('/info/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var novasInformacoes = _.pick(req.body, ['dataNascimento', 'cpf', 'nivel', 'endereco', 'informacoesMedicas', 'contatosSeguranca']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Informacoes.findByIdAndUpdate(id, { $set: novasInformacoes }).then((informacoes) => {
    if (!informacoes) {
      return res.status(404).send();
    }
    res.status(200).send({ informacoes });
  }).catch((e) => {
    res.status(400).send();
  })
})


app.get('/intercambios', authenticate, (req, res) =>{
  
})

// app.get('/escolas', (req, res) => {
//   var listaEscolas = Instituicao.findByFilter(filter).then(())
// })

app.post('/escolas/register', authenticate, (req, res) => {
  if (!req.user.admin){
    return res.status(401).send();
  }
  else{
    
  }
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = { app };