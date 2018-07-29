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
var multiparty = require('connect-multiparty');
const bodyParser = require('body-parser');
const random = require('randomstring');
var { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const express = require('express');
const _ = require('lodash');
var fs = require('fs');
const port = process.env.PORT;
const rotasAdicionais = require('./routes/adicional');
const rotasAdmin = require('./routes/admin');
const rotasCursos = require('./routes/cursos');
const rotasEscolas = require('./routes/escolas');
const rotasInformacoes = require('./routes/informacoesUsuario');
const rotasIntensidades = require('./routes/intensidades');
const rotasIntercambios = require('./routes/intercambios');
const rotasPagamentos = require('./routes/pagamentos');
const rotasPaises = require('./routes/pais');
const rotasTurnos = require('./routes/turnos');
const rotasUsuarios = require('./routes/users');

//Models
var { Informacoes } = require('./models/informacoesUsuario');
var { Intercambios } = require('./models/intercambios');
var { Intensidade } = require('./models/intensidade');
var { Adicional } = require('./models/adicional');
var { Instituicao } = require('./models/escola');
var { Foto } = require('./models/foto');
var { Admin } = require('./models/admin');
var { Curso } = require('./models/curso');
var { Turno } = require('./models/turno');
var { User } = require('./models/user');
var { Pais } = require('./models/pais');

//Middleware
var { authenticate } = require('./middleware/authenticate');
var { authenticateAdmin } = require('./middleware/authenticateAdmin');

//Configuração dos pacotes
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());

//Setando CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Configuração das rotas
app.use('/adicionais', rotasAdicionais);
app.use('/admin', rotasAdmin);
app.use('/cursos', rotasCursos);
app.use('/escolas', rotasEscolas);
app.use('/infos', rotasInformacoes);
app.use('/intensidades', rotasIntensidades);
app.use('/intercambios', rotasIntercambios);
app.use('/pagamentos', rotasPagamentos);
app.use('/paises', rotasPaises);
app.use('/turnos', rotasTurnos);
app.use('/users', rotasUsuarios);

// Path da pasta pública que armazenará as fotos.
var path_public = __dirname + '/public';


app.use(express.static(path_public));

app.post('/upload/imagem', function (req, res) {


  var date = new Date();
  var time_stamp = date.getTime();

  var url_imagem = time_stamp + '-' + req.files.arquivo.originalFilename;

  var path_origem = req.files.arquivo.path;
  var path_destino = path_public + '/' + url_imagem;

  fs.rename(path_origem, path_destino, function (err) {
    // Exclui a foto da pasta temporária.
    fs.unlink(path_origem, function (err) {
      res.redirect('/');
    });

    var dados = {
      url_imagem: url_imagem,
      titulo: req.body.titulo
    }

    Foto.create(dados).then((dados) => {
      res.status(200).send({
        'status': 'inclusão realizada com sucesso'
      });
    }).catch((err) => {
      res.status(400).send({
        'status': 'erro'
      });
    })
  });
});

app.get('/fotos', function (req, res) {
  Foto.find().then((fotos) => {
    res.status(200).send(fotos);
  }, () => {
    res.status(404).send();
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {
  app
}