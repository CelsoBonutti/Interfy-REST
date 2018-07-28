const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const _ = require('lodash');
const pagarme = require('pagarme');
const crypto = require('crypto');

const { Intercambio } = require('../models/intercambios');

router.post('/', (req, res) => {
    var postSignature = req.header('X-Hub-Signature');
    pagarme.verifySignature(process.env.API_KEY, req.body, postSignature).then((valido) => {
        if (valido) {
            Intercambio.find({transactionId: req.body.id}).then((intercambio)=>{
                intercambio.status = 
            },()=>{
                res.status(400).send('Não foi existe intercâmbio com este ID de transação.');
            })
        }
        else {
            res.status(400).send('Chave de verificação inválida');
        }
    })
})

modules.exports = router;