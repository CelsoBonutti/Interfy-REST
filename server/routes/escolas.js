const express = require('express');
const router = express.Router();
const _ = require('lodash');
let {
    authenticate
} = require('../middleware/authenticate');
let {
    Instituicao
} = require('../models/escola');

router.get('/', (req, res) => {
    let filter = req.query;
    Instituicao.findByFilter(filter).then((turnos) => {
        res.status(200).send(turnos);
    }, (e) => {
        res.status(400).send(e);
    })
})

//Rotas de registro de escolas

router.post('/register', authenticate, (req, res) => {
    let escola = _.pick(req.body, ['nome', 'pais', 'cidade', 'fotos', 'diferenciais', 'comentarios', 'infraestrutura', 'atividadesExtra']);

    if (req.isAdmin) {
        Instituicao.create(escola).then((escola) => {
            res.status(200).send(escola);
        }, (e) => {
            res.status(400).send(e);
        })
    }
})

router.delete('/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (req.isAdmin) {
        Instituicao.findById(id).then((instituicao) => {
            instituicao.remove().then((instituicao) => {
                res.status(200).send(instituicao);
            }, (e) => {
                res.status(400).send(e);
            })
        })
    }
})

module.exports = router;