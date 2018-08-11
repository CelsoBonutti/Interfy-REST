const express = require('express');
const router = express.Router();
const _ = require('lodash');
const random = require('randomstring');
var { authenticate } = require('../middleware/authenticate');
var { User } = require('../models/user');

router.post('/register', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'name', 'surname', 'telefone', 'genero']);
    var user = new User(body);
    user.verificationCode = random.generate();
    user.active = false;
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//Atualização de informações do usuário
router.patch('/me', authenticate, (req, res) => {
    var id = req.user.id;
    var newPassword = _.pick(req.body, ['password']).password;
    var novasInformacoes = _.pick(req.body, ['name', 'surname', 'telefone', 'genero']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndUpdate(id, {
        $set: novasInformacoes
    }, {
        new: true
    }).then((user) => {
        user.password = newPassword;
        return user.save().then((user) => {
            res.status(200).send(user);
        }, (e) => {
            res.status(400).send(e);
        })
    })
})

//Exclusão de usuário

router.delete('/me', authenticate, (req, res) => {
    var id = req.user.id;

    User.findByIdAndRemove(id).then((user) => {
        res.status(200).send(user);
    }, () => {
        res.status(400).send();
    })
})

//Rota de login
router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        if (user.active) {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).status(200).send(user);
            });
        } else {
            res.status(401).send('Por favor, confirme seu e-mail.')
        }
    }).catch((e) => {
        res.status(400).send();
    })
})

//Rota de logout
router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})

//Retornar informação do usuário
router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
})

router.get('/confirm/:id', (req, res) => {
    User.activateEmail(req.params.id).then(() => {
        res.status(200).send('Ativado');
    }, (e) => {
        res.status(400).send();
    })
})

module.exports = router;