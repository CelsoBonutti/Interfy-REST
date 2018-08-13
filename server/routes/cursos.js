const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');
const { Curso } = require('../models/curso');


router.post('/register', authenticate, (req, res) => {
    let curso = _.pick(req.body, ['cursos']).cursos;

    if (req.isAdmin) {
        Curso.create(curso).then((curso) => {
            res.status(200).send(curso);
        }, (e) => {
            res.status(400).send(e);
        })
    }
})

router.delete('/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (req.isAdmin) {
        Curso.findById(id).then((curso) => {
            curso.remove().then((curso) => {
                res.status(200).send(curso);
            }, (e) => {
                res.status(400).send(e);
            })
        })
    }
})

module.exports = router;