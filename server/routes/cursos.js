const express = require('express');
const router = express.Router();
const _ = require('lodash');
var { authenticateAdmin } = require('./middleware/authenticateAdmin');
var { Curso } = require('./models/curso');


router.post('/register', authenticateAdmin, (req, res) => {
    var curso = _.pick(req.body, ['cursos']).cursos;

    Curso.create(curso).then((curso) => {
        res.status(200).send(curso);
    }, (e) => {
        res.status(400).send(e);
    })
})

router.delete('/:id', authenticateAdmin, (req, res) => {
    var id = req.params.id;
    Curso.findById(id).then((curso) => {
        curso.remove().then((curso) => {
            res.status(200).send(curso);
        }, (e) => {
            res.status(400).send(e);
        })
    })
})

modules.exports = router;