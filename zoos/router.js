const express = require('express');

const Zoos = require('../data/helpers/zoosDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const zoos = await Zoos.get();
    res.status(200).json(zoos);
  } catch (e) {
    /* handle error */
    res.status(500).json({
      message: 'The zoos information could not be retrieved'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const zoo = await Zoos.getById(req.params.id);

    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res
        .status(404)
        .json({ message: 'The zoo with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The zoo information could not be retrieved.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        errorMessage: 'Please provide a name'
      });
    }
    const zoo = await Zoos.insert(req.body);
    res.status(201).json(zoo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the zoo to the database'
    });
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: 'Please provide a name'
    });
  }
  try {
    const zoo = await Zoos.update(req.params.id, req.body);
    if (zoo) {
      const updatedZoo = await Zoos.getById(req.params.id);
      res.status(200).json(updatedZoo);
    } else {
      res
        .status(404)
        .json({ error: 'The zoo with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The zoo information could not be modified.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const maybeZoo = await Zoos.getById(req.params.id);
    if (maybeZoo) {
      await Zoos.remove(req.params.id);
      return res.status(200).json(maybeZoo);
    } else {
      return res
        .status(404)
        .json({ message: 'The zoo with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the zoo'
    });
  }
});

module.exports = router;
