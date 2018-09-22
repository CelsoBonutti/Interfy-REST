const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');
const { Intensity } = require('../models/intensity');


router.post('/register', authenticate, (req, res) => {
    let intensity = _.pick(req.body, ['intensities']).intensities;
    if (req.isAdmin) {
        Intensity.create(intensity).then((intensity) => {
            res.status(200).send();
        }, (e) => {
            res.status(400).send(e);
        })
    }
    else{
        res.status(404).send();
    }
})

router.delete('/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (req.isAdmin) {
        Intensity.findById(id).then((intensity) => {
            intensity.remove().then((intensity) => {
                res.status(200).send(intensity);
            }, (e) => {
                res.status(400).send(e);
            })
        })
    }
    else{
        res.status(404).send();
    }
})

module.exports = router;