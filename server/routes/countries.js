const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Country } = require('../models/country');
const { authenticate } = require('../middleware/authenticate');

//Retornar informações do país

router.get('/', (req, res) => {
    Country.find().then((country) => {
        res.status(200).send(country);
    }, () => {
        res.status(404).send();
    })
})

//Registrar informações de países
router.post('/register', authenticate, (req, res) => {
    let body = _.pick(req.body, ['name', 'acronym', 'capital', 'continent', 'languages', 'currency', 'description', 'visa', 'climate', 'tips']);
    let country = new Country(body);

    if (req.role === "ADMIN") {
        country.save().then((country) => {
            res.status(200).send(country);
        }, () => {
            res.status(400).send();
        })
    }
    else{
        res.status(404).send();
    }
})

module.exports = router;