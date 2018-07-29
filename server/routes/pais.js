const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const _ = require('lodash');
var { Pais } = require('./models/pais');
var { authenticateAdmin } = require('./middleware/authenticateAdmin');

//Retornar informações do país

router.get('/', (req, res) => {
    Pais.find().then((pais) => {
        res.status(200).send(pais);
    }, () => {
        res.status(404).send();
    })
})

//Registrar informações de países
router.post('/register', authenticateAdmin, (req, res) => {
    var body = _.pick(req.body, ['nome', 'sigla', 'capital', 'continente', 'linguas', 'moeda', 'descricao', 'vistos', 'clima', 'sugestao']);
    var pais = new Pais(body);

    pais.save().then((pais) => {
        res.status(200).send(pais);
    }, () => {
        res.status(400).send();
    })
})

module.exports = router;