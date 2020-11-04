const express = require('express');
const uuid = require('uuid');
const Adapters = require('../models/Adapters');

const router = express.Router();

/**
 * List all adapters.
 * @name GET/api/adapters
 * @return {Adapter[]} - list of adapters
 */
router.get('/', (req, res) => {
  // get all adapters
  let adapters = Adapters.findAll();
  res.status(200).json(adapters).end();
});

router.get('/:id?', (req, res) => {
  let adapter = Adapters.findOne(req.params.id);
  if (adapter === undefined) {
    res.status(404).json({
      error: `Adapter ID ${req.params.id} does not exist.`,
    }).end();
  } else {
    res.status(200).json(adapter).end();
  }
});

module.exports = router;