/*const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');
const { Addon } = require('../models/addon');

router.post('/register', authenticate, (req, res) => {
    let body = _.pick(req.body, ['description', 'price', 'required', 'type', 'coverage', 'school', 'country']);
    let addon = new Addon(body);

    if (req.role === "ADMIN") {
        addon.save().then((addon) => {
            res.status(200).send(addon);
        }, (err) => {
            res.status(400).send(err);
        })
    }
    else{
        res.status(404).send();
    }
})

module.exports = router;*/