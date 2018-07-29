const express = require('express');
const router = express.Router();
const _ = require('lodash');
var { authenticateAdmin } = require('./middleware/authenticateAdmin');
var { Intensidade } = require('./models/intensidade');


router.post('/register', authenticateAdmin, (req, res) => {
    var intensidade = _.pick(req.body, ['intensidades']).intensidades;
    Intensidade.create(intensidade).then((intensidade) => {
        res.status(200).send(intensidade);
    }, (e) => {
        res.status(400).send(e);
    })
})

router.delete('/:id', authenticateAdmin, (req, res) => {
    var id = req.params.id;
    Intensidade.findById(id).then((intensidade) => {
        intensidade.remove().then((intensidade) => {
            res.status(200).send(intensidade);
        }, (e) => {
            res.status(400).send(e);
        })
    })
})

modules.exports = router;