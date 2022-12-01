'use strict';

const express = require('express');

const { PetModel } = require('../models');

const router = express.Router();

router.get('/pets/:id', async (req,res,next) => {
  try {
    const pet = await PetModel.findOne({ where: {id: req.params.id}});
    res.status(200).send(pet);
  } catch (error) {
    next(error);
  }
});

router.get('/pets', async (req,res,next) => {
  try {
    const pets = await PetModel.findAll();
    res.status(200).send(pets);
  } catch (error) {
    next(error);
  }
});

router.post('/pets', async ( req, res, next) =>{
  try {
    const newPet = await PetModel.create(req.body);
    res.status(200).send(newPet);
  } catch (error) {
    next(error);
  }
});

router.put('/pets/:id', async (req,res,next) => {
  try {
    await PetModel.update(req.body ,{ where: {id: req.params.id}});
    const newPet = await PetModel.findOne({ where: {id: req.params.id}});
    res.status(200).send(newPet);
  } catch (error) {
    next(error);
  }
});

router.delete('/pets/:id', async (req,res,next) => {
  try {
    await PetModel.destroy({ where: {id: req.params.id}});
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
