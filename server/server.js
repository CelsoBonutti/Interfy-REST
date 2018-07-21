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
const random = require('randomstring');

//Rotas
const rotaIntercambios = require('./routes/intercambios');

//Models
var { User } = require('./models/user');
var { Admin } = require('./models/admin');
var { Instituicao } = require('./models/ies');
var { Curso } = require('./models/curso');
var { Informacoes } = require('./models/informacoesUsuario');
var { Intercambios } = require('./models/intercambios');
var { Turno } = require('./models/turno');
var { Intensidade } = require('./models/intensidade');
var { Pais } = require('./models/pais');

//Middleware
var { authenticate } = require('./middleware/authenticate');
var { authenticateAdmin } = require('./middleware/authenticateAdmin');

//Configuração dos frameworks
var app = express();
app.use(bodyParser.json());

//Setando CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/')

//Rota de registro de admin
app.post('/admin/register', authenticateAdmin, (req, res) =>{
  var body = _.pick(req.body, ['email', 'password']);
  var admin = new Admin(body);

  admin.save().then(() =>{
    return admin.generateAuthToken();
  }).then((token) =>{
    res.header('x-auth', token).send(admin);
  }).catch((e) =>{
    res.status(400).send(e);
  })
})

//Rota de login de admin
app.post('/admin/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  Admin.findByCredentials(body.email, body.password).then((admin) => {
    return admin.generateAuthToken().then((token) => {
      res.header('x-auth', token).status(200).send(admin);
    });
  }).catch((e) => {
    res.status(400).send();
  })
})

//Rota de logout de admin
app.delete('/admin/me/token', authenticateAdmin, (req, res) => {
  req.admin.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

//Rotas dos usuários

//Registro de usuários
app.post('/users/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'nome', 'sobrenome', 'telefone', 'genero']);
  var user = new User(body);
  user.verificationCode = random.generate();
  user.active = false;
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
  var novasInformacoes = _.pick(req.body, ['nome', 'sobrenome', 'telefone', 'genero']);
  
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
    if(user.active){
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).status(200).send(user);
    });
    }
    else{
      res.status(401).send('Por favor, confirme seu e-mail.')
    }
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

app.get('/users/confirm/:id', (req, res)=>{
  User.activateEmail(req.params.id).then(()=>{
    res.status(200).send('Ativado');
  },(e)=>{
    res.status(400).send();
  })
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
  Pais.find().then((pais) =>{
    res.status(200).send(pais);
  }, () =>{
    res.status(404).send();
  })
})

//Registrar informações de países
app.post('/pais/register', authenticateAdmin, (req, res) =>{
  var body = _.pick(req.body, ['nome', 'sigla', 'capital', 'continente', 'linguas', 'moeda', 'descricao', 'vistos', 'clima', 'sugestao']);
  var pais = new Pais(body);
  
  pais.save().then((pais) =>{
    res.status(200).send(pais);
  }, ()=>{
    res.status(400).send();
  })
})

//Rotas de escola

//Rotas de retorno de informações das escolas
app.get('/escolas', (req, res) => {
  var filter = req.query;
  Instituicao.findByFilter(filter).then((turnos) =>{
    res.status(200).send(turnos);
  },(e) =>{
    res.status(400).send(e);
  })
})

//Rotas de registro de escolas

app.post('/escolas/register', authenticateAdmin, (req, res) => {
  var escola = _.pick(req.body, ['nome', 'pais', 'cidade', 'fotos', 'diferenciais', 'comentarios', 'infraestrutura', 'atividadesExtra']);
  Instituicao.create(escola).then((escola) =>{
    res.status(200).send(escola);
  },(e)=>{
    res.status(400).send(e);
  })
})

app.post('/cursos/register', authenticateAdmin, (req, res) =>{
  var curso = _.pick(req.body, ['cursos']).cursos;
  
  Curso.create(curso).then((curso) =>{
    res.status(200).send(curso);
  },(e)=>{
    res.status(400).send(e);
  })
})

app.post('/intensidades/register', authenticateAdmin, (req, res) =>{
  var intensidade = _.pick(req.body, ['intensidades']).intensidades;
  Intensidade.create(intensidade).then((intensidade) =>{
    res.status(200).send(intensidade);
  },(e)=>{
    res.status(400).send(e);
  })
})

app.post('/turnos/register', authenticateAdmin, (req, res) =>{
  var turno = _.pick(req.body, ['turnos']).turnos;
  Turno.create(turno).then((turno) =>{
    res.status(200).send(turno);
  },(e)=>{
    res.status(400).send(e);
  })
})



//Rotas de exclusão de escolas

app.delete('/turnos/:id', authenticateAdmin, (req, res) =>{
  var id = req.params.id;
  Turno.findByIdAndRemove(id).then((turno) =>{
    res.status(200).send(turno);
  },(e)=>{
    res.status(400).send(e);
  })
})

app.delete('/intensidades/:id', authenticateAdmin, (req,res)=>{
  var id = req.params.id;
  Intensidade.findById(id).then((intensidade)=>{
    intensidade.remove().then((intensidade)=>{
      res.status(200).send(intensidade);
    },(e)=>{
      res.status(400).send(e);
    })
  })
})

app.delete('/cursos/:id', authenticateAdmin, (req, res)=>{
  var id = req.params.id;
  Curso.findById(id).then((curso)=>{
    curso.remove().then((curso)=>{
      res.status(200).send(curso);
    },(e)=>{
      res.status(400).send(e);
    })
  })
})

app.delete('/escolas/:id', authenticateAdmin, (req,res)=>{
  var id = req.params.id;
  Instituicao.findById(id).then((instituicao)=>{
    instituicao.remove().then((instituicao)=>{
      res.status(200).send(instituicao);
    },(e)=>{
      res.status(400).send(e);
    })
  })
})


app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = { app }