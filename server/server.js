//Configuração das variáveis de ambiente
var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if (env === 'development') {
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/dev';
} else if (env === 'test') {
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/test'
}

var { mongoose } = require('./db/mongoose');


//Bibliotecas
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const jwt = require('jsonwebtoken');
var { ObjectID } = require('mongodb');

//Models
var { User } = require('./models/user');
var { Instituicao } = require('./models/ies');
var { Curso } = require('./models/curso');
var { Informacoes } = require('./models/informacoesUsuario');
var { Intercambios } = require('./models/intercambios');
var { Paises } = require('./models/pais');
var { Turno } = require('./models/turno');
var { CargaHoraria } = require('./models/cargaHoraria');
var { Pais } = require('./models/pais');

//Middleware
var { authenticate } = require('./middleware/authenticate');
var { authenticateAdmin } = require('./middleware/authenticateAdmin');

//Configuração dos frameworks
var app = express();
app.use(bodyParser.json());

//Rotas dos usuários

//Registro de usuários
app.post('/users/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'nome', 'sobrenome', 'telefone', 'sexo']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
})

//Atualização de informações do usuário
app.patch('/users/me', authenticate, (req, res) =>{
  var id = req.user.id;
  var newPassword = _.pick(req.body, ['password']).password;
  var novasInformacoes = _.pick(req.body, ['nome', 'sobrenome', 'telefone', 'sexo']);
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  
  User.findByIdAndUpdate(id, {$set: novasInformacoes}, {new: true}).then((user) =>{
    user.password = newPassword;
    return user.save().then((user) =>{
      res.status(200).send(user);
    },(e)=>{
      res.status(400).send(e);
    })
    res.status(200).send(user);
  })
})

//Exclusão de usuário

app.delete('/users/me', authenticate, (req,res) =>{
  var id = req.user.id;
  
  User.findByIdAndRemove(id).then((user) =>{
    res.status(200).send(user);
  },() =>{
    res.status(400).send();
  })
})

//Rota de login
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

//Rota de logout
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

//Retornar informação do usuário
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})

//Rotas de informações pessoais de usuários

//Registra informações pessoais do usuário
app.post('/info/me', authenticate, (req, res) =>{
  var body = _.pick(req.body, ['dataNascimento', 'cpf', 'nivel', 'endereco', 'informacoesMedicas', 'contatosSeguranca']);
  var informacoes = new Informacoes(body);

  informacoes.save().then((informacoes) =>{
    res.status(200).send(informacoes)
  }, (e) =>{
    res.status(400).send(e)
  })
})

//Retorna informações pessoais do usuário
app.get('/info/me', authenticate, (req, res) => {
  Informacoes.findByUserId(req.user._id).then((informacoes) => {
    res.status(200).send(informacoes);
  }, (e) => {
    res.status(400).send(e);
  })
})

//Atualiza registro de informações pessoais do usuário
app.patch('/info/me', authenticate, (req, res) => {
  var id = req.user._id;
  var novasInformacoes = _.pick(req.body, ['dataNascimento', 'cpf', 'nivel', 'endereco', 'informacoesMedicas', 'contatosSeguranca']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Informacoes.findByIdAndUpdate(id, { $set: novasInformacoes }, {new: true}).then((informacoes) => {
    if (!informacoes) {
      return res.status(404).send();
    }
    res.status(200).send({ informacoes });
  }).catch((e) => {
    res.status(400).send(e);
  })
})

//Rotas de intercâmbio

//Retornar intercâmbios do usuário
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

//Registro de intercâmbios para usuário
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


//Rotas de países

//Retornar informações do país

app.get('/pais', (req, res) =>{
  Paises.findBySigla(req.body.pais).then((pais) =>{
    res.status(200).send(pais);
  }, () =>{
    res.status(404).send();
  })
})

//Registrar informações de países
app.post('/pais/register', authenticateAdmin, (req, res) =>{
  var body = _.pick(req.body, ['nome', 'sigla', 'capital', 'continente', 'linguas', 'moeda', 'descricao', 'vistos', 'clima', 'sugestao']);
  var pais = new Paises(body);
  
  pais.save().then((pais) =>{
    res.status(200).send(pais);
  }, ()=>{
    res.status(400).send();
  })
})

//Rotas de escola

//Rotas de retorno de informações das escolas
app.get('/escolas', (req, res) => {
  var listaEscolas = Instituicao.findByFilter(filter).then((escolas) =>{
    res.status(200).send(escolas);
  },() =>{
    res.status(400).send();
  })
})

app.delete('/escolas', (req, res) =>{

})

//Rotas de criação da escola

app.post('/escolas/register', authenticateAdmin, (req, res) => {
  var turnos = _.pick(req.body, ['turnos']);
  var cargas = _.pick(req.body, ['cargas']);
  var cursos = _.pick(req.body, ['cursos']);
  var escola = _.pick(req.body, ['nome', 'pais', 'cidade', 'cursos', 'fotos', 'diferenciais', 'comentarios', 'infraestrutura', 'atividadesExtra']);
})

//Rotas de turno

//Registro de turnos
app.post('/turno/register', (req, res) =>{
  var turnos = _.pick(req.body, ['turnos']).turnos;
  
  Turno.create(turnos).then((turnos) =>{
    var turnosId = _.map(turnos, '_id');
    res.status(200).send(turnosId);
  }, (e)=>{
    res.status(400).send(e);
  })
})

app.delete('/turno/:id', authenticateAdmin, (req, res) =>{
  var id = req.param.id;

})

app.get('/turno')

//Rotas de cargas

//Registro de cargas
app.post('/carga/register', (req, res) =>{
  var cargas = _.pick(req.body, ['cargas']).cargas;
  
  CargaHoraria.create(cargas).then((cargas) =>{
    var cargasId = _.map(cargas, '_id');
    res.status(200).send(cargasId);
  }, (e)=>{
    res.status(400).send(e);
  })

})

//Adicionar turno à carga
app.post('/carga/adicionarTurno/:id', authenticateAdmin, (req, res) =>{
  
})

//Registro de curso
app.post('/curso/register', authenticateAdmin, (req, res) =>{
  var cursos = _.pick(req.body, ['titulo', 'descricao', 'cargaHoraria']);

  Curso.create(cursos).then(() =>{
    res.status(200).send();
  }, (e)=>{
    res.status(400).send();
  })
})

//Adicionar carga ao curso
app.post('/curso/adicionarCarga/:id', authenticateAdmin, (req, res) =>{
  var body = _.pick(req.body, ['']);
  var id = req.params.id;
})

app.post('/admin/register', (req, res) =>{
  var body = _.pick(req.body, []);
})


app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = { app };CargaHoraria