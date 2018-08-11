const express = require('express');
const router = express.Router();
const _ = require('lodash');
const pagarme = require('pagarme');
const { Intercambio } = require('../models/intercambios');

router.post('/', (req, res) => {
    var postSignature = req.header('X-Hub-Signature');
    pagarme.verifySignature(process.env.API_KEY, req.body, postSignature).then((valido) => {
        if (valido) {
            Intercambio.find({transactionId: req.body.id}).then((intercambio)=>{
                intercambio.status = req.body.id;
                intercambio.save().then(()=>{
                    res.status(200).send();
                })
            },()=>{
                res.status(400).send('Não foi encontrado intercâmbio com este ID de transação.');
            })
        }
        else {
            res.status(401).send('Erro de autenticação.');
        }
    })
})

module.exports = router;