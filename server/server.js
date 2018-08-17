//Configuração das variáveis de ambiente
let env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === 'development') {
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/dev';
  process.env.JWT_SECRET = 'segredomuitosecreto';
  process.env.URL = 'http://localhost:8000';
  process.env.CLOUD_NAME = '';
  process.env.CLOUR_KEY = '';
  process.env.CLOUR_SECRET = '';
}

//Bibliotecas
const bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
const express = require('express');
const _ = require('lodash');
const port = process.env.PORT;
const rotasAdicionais = require('./routes/adicional');
const rotasCursos = require('./routes/cursos');
const rotasEscolas = require('./routes/escolas');
const rotasInformacoes = require('./routes/informacoesUsuario');
const rotasIntensidades = require('./routes/intensidades');
const rotasIntercambios = require('./routes/intercambios');
const rotasPagamentos = require('./routes/pagamentos');
const rotasPaises = require('./routes/pais');
const rotasTurnos = require('./routes/turnos');
const rotasUsuarios = require('./routes/users');
const graphqlHTTP = require('express-graphql');
const { mongoose } = require('./libs/mongoose');

//Configuração dos pacotes
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Setando CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-auth");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Configuração das rotas
app.use('/adicionais', rotasAdicionais);
app.use('/cursos', rotasCursos);
app.use('/escolas', rotasEscolas);
app.use('/infos', rotasInformacoes);
app.use('/intensidades', rotasIntensidades);
app.use('/intercambios', rotasIntercambios);
app.use('/pagamentos', rotasPagamentos);
app.use('/paises', rotasPaises);
app.use('/turnos', rotasTurnos);
app.use('/users', rotasUsuarios);
app.use('/graphql', graphqlHTTP({}));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {
  app
}