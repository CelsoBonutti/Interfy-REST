const express = require('express');
const router = express.Router();
const _ = require('lodash');
let {
    Pais
} = require('../models/pais');
let {
    authenticate
} = require('../middleware/authenticate');

//Retornar informações do país

router.get('/', (req, res) => {
    Pais.find().then((pais) => {
        res.status(200).send(pais);
    }, () => {
        res.status(404).send();
    })
})

//Registrar informações de países
router.post('/register', authenticate, (req, res) => {
    let body = _.pick(req.body, ['nome', 'sigla', 'capital', 'continente', 'linguas', 'moeda', 'descricao', 'vistos', 'clima', 'sugestao']);
    let pais = new Pais(body);

    if (req.isAdmin) {
        pais.save().then((pais) => {
            res.status(200).send(pais);
        }, () => {
            res.status(400).send();
        })
    }
})

module.exports = router;