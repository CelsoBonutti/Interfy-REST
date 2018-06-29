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
var { Paises } = require('./models/pais');
var { Turno } = require('./models/turno');
var { Carga } = require('./models/cargaHoraria');

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

app.post('/info/me', authenticate, (req, res) =>{
  var body = _.pick(req.body, ['dataNascimento', 'cpf', 'nivel', 'endereco', 'informacoesMedicas', 'contatosSeguranca']);
  var informacoes = new Informacoes(body);

  informacoes.save().then((informacoes) =>{
    res.status(200).send(informacoes)
  }, () =>{
    res.status(400).send(informacoes)
  })
})

app.get('/info/me', authenticate, (req, res) => {
  Informacoes.findByUserId(req.user._id).then((informacoes) => {
    res.status(200).send(informacoes);
  }, () => {
    res.status(400).send();
  })
})

app.patch('/info/me', authenticate, (req, res) => {
  var id = req.user._id;
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
    res.status(400).send(e);
  })
})


app.get('/intercambios', authenticate, (req, res) =>{
  var id = req.user._id

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Intercambios.findByUserIdAndPopulate(id).then((intercambios) =>{
    if(!intercambios){
      return res.status(404).send();
    }
    res.status(200).send({ intercambios });
  }).catch((e) =>{
    res.status(400).send(e);
  })
})

app.post('/intercambios', authenticate, (req, res) =>{
  var body = _.pick(req.body, ['adicionais', 'curso'])
  body._userId = req.user._id;
  var novoIntercambio = new Intercambios(novoIntercambio);

  novoIntercambio.save().then(() =>{
    res.status(200).send();
  }).catch((e) =>{
    res.status(400).send();
  })
})

app.get('/escolas', (req, res) => {
  var listaEscolas = Instituicao.findByFilter(filter).then((escolas) =>{
    res.status(200).send(escolas);
  },() =>{
    res.status(400).send();
  })
})

app.post('/escolas/register', authenticateAdmin, (req, res) => {
  var turnos = _.pick(req.body, ['turnos']);
  var cargas = _.pick(req.body, ['cargas']);
  var cursos = _.pick(req.body, ['cursos']);
  var escola = _.pick(req.body, ['nome', 'pais', 'cidade', 'cursos', 'fotos', 'diferenciais', 'comentarios', 'infraestrutura', 'atividadesExtra']);
})

app.get('/pais', (req, res) =>{
  Paises.findBySigla(req.body.pais).then((pais) =>{
    res.status(200).send(pais);
  }, () =>{
    res.status(404).send();
  })
})

app.post('/pais/register', authenticateAdmin, (req, res) =>{
  var body = _.pick(req.body, ['nome', 'sigla', 'capital', 'continente', 'linguas', 'moeda', 'descricao', 'vistos', 'clima', 'sugestao']);
  var pais = new Paises(body);

  pais.save().then((pais) =>{
    res.status(200).send(pais);
  }, ()=>{
    res.status(400).send();
  })
})




//Rotas de criação da escola

app.post('/turno/register', authenticateAdmin, (req, res) =>{
  var turnos = _.pick(req.body, ['nome', 'descricao', 'duracao']);
  
  Turno.create(turnos).then(() =>{
    res.status(200).send();
  }, ()=>{
    res.status(400).send();
  })
})

app.post('/carga/register', authenticateAdmin, (req, res) =>{
  var cargas = _.pick(req.body, ['descricao', 'turno']);

  Carga.create(cargas).then(() =>{
    res.status(200).send();
  }, (e)=>{
    res.status(400).send(e);
  })
})

app.post('/carga/adicionarTurno', authenticateAdmin, (req, res) =>{
  // var 
})

app.post('/curso/register', authenticateAdmin, (req, res) =>{
  var cursos = _.pick(req.body, ['titulo', 'descricao', 'cargaHoraria']);

  Curso.create(cursos).then(() =>{
    res.status(200).send();
  }, (e)=>{
    res.status(400).send();
  })
})

app.post('/curso/adicionarCarga/:id', authenticateAdmin, (req, res) =>{
  var body = _.pick(req.body, ['']);


})


app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = { app };