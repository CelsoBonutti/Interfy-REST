const express = require('express');
const router = express.Router();
const _ = require('lodash');
var { Turno } = require('../models/turno');
var { authenticateAdmin } = require('../middleware/authenticateAdmin');

router.post('/register', authenticateAdmin, (req, res) => {
    var turno = _.pick(req.body, ['turnos']).turnos;
    Turno.create(turno).then((turno) => {
        res.status(200).send(turno);
    }, (e) => {
        res.status(400).send(e);
    })
})

router.delete('/:id', authenticateAdmin, (req, res) => {
    var id = req.params.id;
    Turno.findByIdAndRemove(id).then((turno) => {
        res.status(200).send(turno);
    }, (e) => {
        res.status(400).send(e);
    })
})

module.exports = router;