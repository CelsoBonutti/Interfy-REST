const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Shift } = require('../models/Shift');
const { authenticate } = require('../middleware/authenticate');

router.post('/register', authenticate, (req, res) => {
    if (req.isAdmin) {
        let shift = _.pick(req.body, ['shifts']).shifts;
        Shift.create(shift).then((shift) => {
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
    if (req.isAdmin) {
        let id = req.params.id;
        Shift.findByIdAndRemove(id).then((shift) => {
            res.status(200).send(shift);
        }, (e) => {
            res.status(400).send(e);
        })
    }
    else{
        res.status(404).send();
    }
})

module.exports = router;