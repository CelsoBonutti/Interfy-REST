const express = require('express');
const router = express.Router();
const _ = require('lodash');
let {
    authenticate
} = require('../middleware/authenticate');
let {
    Intensidade
} = require('../models/intensidade');


router.post('/register', authenticate, (req, res) => {
    let intensidade = _.pick(req.body, ['intensidades']).intensidades;
    if (req.isAdmin) {
        Intensidade.create(intensidade).then((intensidade) => {
            res.status(200).send(intensidade);
        }, (e) => {
            res.status(400).send(e);
        })
    }
})

router.delete('/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (req.isAdmin) {
        Intensidade.findById(id).then((intensidade) => {
            intensidade.remove().then((intensidade) => {
                res.status(200).send(intensidade);
            }, (e) => {
                res.status(400).send(e);
            })
        })
    }
})

module.exports = router;