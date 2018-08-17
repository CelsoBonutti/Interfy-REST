const express = require('express');
const router = express.Router();
const _ = require('lodash');
const random = require('randomstring');
const { ObjectID } = require('mongodb');
const { authenticate } = require('../middleware/authenticate');
const { User } = require('../models/user');
const { createJWToken } = require('../libs/auth');

//Registro de usuário
router.post('/register', (req, res) => {
    let body = _.pick(req.body, ['email', 'password', 'name', 'surname', 'telefone', 'genero']);
    let user = new User(body);
    user.verificationCode = random.generate();
    user.active = false;
    user.save().then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//Atualização de informações do usuário
router.patch('/me', authenticate, (req, res) => {
    let id = req.id;
    let newPassword = _.pick(req.body, ['password']).password;
    let novasInformacoes = _.pick(req.body, ['name', 'surname', 'telefone', 'genero']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndUpdate(id, {
        $set: novasInformacoes
    }, {
        new: true
    }).then((user) => {
        if (newPassword) {
            user.password = newPassword;
        }
        return user.save().then((user) => {
            res.status(200).send(user);
        }, (e) => {
            res.status(400).send(e);
        })
    })
})

//Exclusão de usuário
router.delete('/me', authenticate, (req, res) => {
    let id = req.id;

    User.findByIdAndRemove(id).then((user) => {
        res.status(200).send(user);
    }, (e) => {
        res.status(400).json({message: e});
    })
})

//Rota de login
router.post('/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        if (user.active) {
            res.header('x-auth', createJWToken(user)).status(200).send(createJWToken(user));
        } else {
            res.status(401).json({
                message: 'Por favor, confirme seu e-mail.'
            });
        }
    }, () => {
        res.status(401).json({
            message: 'Login e/ou senha incorretos'
        });
    }).catch((e) => {
        res.status(400).send();
    })
})


//Retornar informação do usuário
router.get('/me', authenticate, (req, res) => {
    User.findById(req.id).then((user)=>{
        res.status(200).send(user);
    }, (err)=>{
        res.status(400).send();
    });
})

//Rota de ativação de e-mail
router.get('/confirm/:id', (req, res) => {
    User.activateEmail(req.params.id).then(() => {
        res.status(200).send('Ativado');
    }, (e) => {
        res.status(400).send();
    })
})

module.exports = router;