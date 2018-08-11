const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var { Admin } = require('../models/admin');
var { authenticateAdmin } = require('../middleware/authenticateAdmin');

const _ = require('lodash');

//Rota de registro de admin
router.post('/register', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var admin = new Admin(body);

    admin.save().then(() => {
        console.log("hehe bozzano");
        return admin.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(admin);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//Rota de login de admin
router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    Admin.findByCredentials(body.email, body.password).then((admin) => {
        return admin.generateAuthToken().then((token) => {
            res.header('x-auth', token).status(200).send(admin);
        });
    }).catch((e) => {
        res.status(400).send();
    })
})

//Rota de logout de admin
router.delete('/me/token', authenticateAdmin, (req, res) => {
    req.admin.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})

module.exports = router;