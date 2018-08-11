const express = require('express');
const router = express.Router();
var { authenticateAdmin } = require('../middleware/authenticateAdmin');
const _ = require('lodash');
var { Adicional } = require('../models/adicional');

router.post('/adicional/register', authenticateAdmin, (req, res) => {
    var body = _.pick(req.body, ['descricao', 'valor', 'instituicao', 'intercambio']);
    var adicional = new Adicional(body);

    adicional.save().then((adicional) => {
        res.status(200).send(adicional);
    }, (err) => {
        res.status(400).send(err);
    })
})

module.exports = router;