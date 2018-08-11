const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');
var { Intercambios } = require('../models/intercambios');

//Retornar intercâmbios do usuário
router.get('/', authenticate, (req, res) => {
  var id = req.user._id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Intercambios.findByUserIdAndPopulate(id).then((intercambios) => {
    if (!intercambios) {
      return res.status(404).send();
    }
    res.status(200).send({
      intercambios
    });
  }).catch((e) => {
    res.status(400).send(e);
  })
})

//Registro de intercâmbios para usuário
router.post('/', authenticate, (req, res) => {
  var body = _.pick(req.body, ['curso'])
  body._userId = req.user._id;
  var novoIntercambio = new Intercambios(novoIntercambio);

  novoIntercambio.save().then(() => {
    res.status(200).send();
  }).catch((e) => {
    res.status(400).send();
  })
})

module.exports = router;