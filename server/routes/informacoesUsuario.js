const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');
const { Informacoes } = require('../models/informacoesUsuario');

//Registra informações pessoais do usuário
router.post('/me', authenticate, (req, res) => {
    let body = _.pick(req.body, ['dataNascimento', 'cpf', 'nivel', 'endereco', 'informacoesMedicas', 'contatosSeguranca']);
    let informacoes = new Informacoes(body);

    informacoes.save().then((informacoes) => {
        res.status(200).send(informacoes)
    }, (e) => {
        res.status(400).send(e)
    })
})

//Retorna informações pessoais do usuário
router.get('/me', authenticate, (req, res) => {
    Informacoes.findByUserId(req.user._id).then((informacoes) => {
        res.status(200).send(informacoes);
    }, (e) => {
        res.status(400).send(e);
    })
})

//Atualiza registro de informações pessoais do usuário
router.patch('/me', authenticate, (req, res) => {
    let id = req.user._id;
    let novasInformacoes = _.pick(req.body, ['dataNascimento', 'cpf', 'nivel', 'endereco', 'informacoesMedicas', 'contatosSeguranca']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Informacoes.findByIdAndUpdate(id, {
        $set: novasInformacoes
    }, {
        new: true
    }).then((informacoes) => {
        if (!informacoes) {
            return res.status(404).send();
        }
        res.status(200).send({
            informacoes
        });
    }).catch((e) => {
        res.status(400).send(e);
    })
})

module.exports = router;