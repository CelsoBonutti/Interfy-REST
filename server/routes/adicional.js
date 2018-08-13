const express = require('express');
const router = express.Router();
let {
    authenticate
} = require('../middleware/authenticate');
const _ = require('lodash');
let {
    Adicional
} = require('../models/adicional');

router.post('/adicional/register', authenticate, (req, res) => {
    let body = _.pick(req.body, ['descricao', 'valor', 'instituicao', 'intercambio']);
    let adicional = new Adicional(body);

    if (req.isAdmin) {
        adicional.save().then((adicional) => {
            res.status(200).send(adicional);
        }, (err) => {
            res.status(400).send(err);
        })
    }
    else{
        res.status(401).send('Usuário não autorizado.')
    }
})

module.exports = router;