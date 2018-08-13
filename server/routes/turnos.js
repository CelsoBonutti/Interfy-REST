const express = require('express');
const router = express.Router();
const _ = require('lodash');
let {
    Turno
} = require('../models/turno');
let {
    authenticate
} = require('../middleware/authenticate');

router.post('/register', authenticate, (req, res) => {
    if (req.isAdmin) {
        let turno = _.pick(req.body, ['turnos']).turnos;
        Turno.create(turno).then((turno) => {
            res.status(200).send(turno);
        }, (e) => {
            res.status(400).send(e);
        })
    }
})

router.delete('/:id', authenticate, (req, res) => {
    if (req.isAdmin) {
        let id = req.params.id;
        Turno.findByIdAndRemove(id).then((turno) => {
            res.status(200).send(turno);
        }, (e) => {
            res.status(400).send(e);
        })
    }
})

module.exports = router;