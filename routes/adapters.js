const express = require('express');
const uuid = require('uuid');
const Adapters = require('../models/Adapters');

const router = express.Router();

/**
 * List all adapters.
 * @name GET/api/adapters
 * @return {Adapter[]} - list of adapters
 */
router.get('/', async (req, res) => {
  // get all adapters
  let adapters = await Adapters.findAll();
  res.status(200).json(adapters).end();
});

router.get('/:id?', async (req, res) => {
  let adapter = await Adapters.findOne(req.params.id);
  if (adapter === undefined) {
    res.status(404).json({
      error: `Adapter ID ${req.params.id} does not exist.`,
    }).end();
  } else {
    res.status(200).json(adapter).end();
  }
});

/**
 * Upload adapter.
 */
router.post('/', async (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const code = req.body.code;
  const description = req.body.description;
  var adapter = await Adapters.findOneByName(name);
  if (adapter !== undefined) {
    res.status(400).json({
      error: `Adapter ${name} already exists.`,
    }).end();
  } else {
    // generate uuid for id
    const id = uuid.v4();
    adapter = await Adapters.addOne(id, name, url, code, description);
    // return the created user with HTTP Status Code 201 Created
    res.status(201).json(adapter).end();
  }
});

module.exports = router;