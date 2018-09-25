const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {
    authenticate
} = require('../middleware/authenticate');
const {
    Course
} = require('../models/course');


router.post('/register', authenticate, (req, res) => {
    let course = _.pick(req.body, ['courses']).courses;

    if (req.role === "ADMIN") {
        Course.create(course).then((course) => {
            res.status(200).send(course);
        }, (e) => {
            res.status(400).send(e);
        })
    } else {
        res.status(404).send();
    }
})

router.delete('/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (req.role === "ADMIN") {
        Course.findById(id).then((course) => {
            course.remove().then((course) => {
                res.status(200).send(course);
            }, (e) => {
                res.status(400).send(e);
            })
        })
    } else {
        res.status(404).send();
    }
})

module.exports = router;