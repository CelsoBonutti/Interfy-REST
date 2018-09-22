const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');
const { Exchange } = require('../models/Exchange');

//Retornar intercâmbios do usuário
router.get('/', authenticate, (req, res) => {
  let id = req.user._id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Exchange.findByUserIdAndPopulate(id).then((exchange) => {
    if (!exchange) {
      return res.status(404).send();
    }
    res.status(200).send({
      exchange
    });
  }).catch((e) => {
    res.status(400).send(e);
  })
})

//Registro de intercâmbios para usuário
router.post('/', authenticate, (req, res) => {
  let body = _.pick(req.body, ['course', 'transactionId'])
  body._userId = req.id;
  let newExchange = new Exchange(body);

  newExchange.save().then(() => {
    res.status(200).send();
  }).catch((e) => {
    res.status(400).send();
  })
})

module.exports = router;