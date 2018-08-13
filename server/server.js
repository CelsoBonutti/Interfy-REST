//Configuração das variáveis de ambiente
let env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === 'development') {
  process.env.PORT = 8000;
  process.env.MONGO_STR = 'mongodb://localhost:27017/dev';
  process.env.JWT_SECRET = 'segredomuitosecreto';
  process.env.URL = 'http://localhost:8000';
}

//Bibliotecas
let multiparty = require('connect-multiparty');
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
let fs = require('fs');
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
const { mongoose } = require('./libs/mongoose');

//Models
let { Foto } = require('./models/foto');

//Configuração dos pacotes
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());

//Setando CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
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

// Path da pasta pública que armazenará as fotos.
let path_public = __dirname + '/public';


app.use(express.static(path_public));

app.post('/upload/imagem', function (req, res) {


  let date = new Date();
  let time_stamp = date.getTime();

  let url_imagem = time_stamp + '-' + req.files.arquivo.originalFilename;

  let path_origem = req.files.arquivo.path;
  let path_destino = path_public + '/' + url_imagem;

  fs.rename(path_origem, path_destino, function (err) {
    // Exclui a foto da pasta temporária.
    fs.unlink(path_origem, function (err) {
      res.redirect('/');
    });

    let dados = {
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