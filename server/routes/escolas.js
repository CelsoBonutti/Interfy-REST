const express = require('express');
const router = express.Router();
const _ = require('lodash');
var { authenticateAdmin } = require('../middleware/authenticateAdmin');
var { Instituicao } = require('../models/escola');

router.get('/', (req, res) => {
    var filter = req.query;
    Instituicao.findByFilter(filter).then((turnos) => {
        res.status(200).send(turnos);
    }, (e) => {
        res.status(400).send(e);
    })
})

//Rotas de registro de escolas

router.post('/register', authenticateAdmin, (req, res) => {
    var escola = _.pick(req.body, ['nome', 'pais', 'cidade', 'fotos', 'diferenciais', 'comentarios', 'infraestrutura', 'atividadesExtra']);
    Instituicao.create(escola).then((escola) => {
        res.status(200).send(escola);
    }, (e) => {
        res.status(400).send(e);
    })
})

router.delete('/:id', authenticateAdmin, (req, res) => {
    var id = req.params.id;
    Instituicao.findById(id).then((instituicao) => {
        instituicao.remove().then((instituicao) => {
            res.status(200).send(instituicao);
        }, (e) => {
            res.status(400).send(e);
        })
    })
})

module.exports = router;