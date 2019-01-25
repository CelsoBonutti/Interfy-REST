/*const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');
const { UserInfo } = require('../models/userInfo');

//Registra informações pessoais do usuário
router.post('/me', authenticate, (req, res) => {
    let body = _.pick(req.body, ['birthday', 'cpf', 'languageLevel', 'address', 'medicalInformation', 'emergencyContacts']);
    let information = new UserInfo(body);
    information.userId = req.id;

    information.save().then((information) => {
        res.status(200).send()
    }, (e) => {
        res.status(400).send(e)
    })
})

//Retorna informações pessoais do usuário
router.get('/me', authenticate, (req, res) => {
    UserInfo.findByUserId(req.id).then((information) => {
        res.status(200).send(information);
    }, (e) => {
        res.status(400).send(e);
    })
})

//Atualiza registro de informações pessoais do usuário
router.patch('/me', authenticate, (req, res) => {
    let id = req.id;
    let newInfo = _.pick(req.body, ['birthday', 'cpf', 'languageLevel', 'address', 'medicalInformation', 'emergencyContacts']);

    UserInfo.findByIdAndUpdate(id, {
        $set: newInfo
    }, {new: true}).then((information) => {
        if (!information) {
            return res.status(404).send();
        }
        res.status(200).send({
            information
        });
    }).catch((e) => {
        res.status(400).send(e);
    })
})

module.exports = router;*/