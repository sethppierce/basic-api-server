'use strict';

const express = require('express');

const { GamesModel } = require('../models');

const router = express.Router();

router.get('/games/:id', async (req,res,next) => {
  try {
    const game = await GamesModel.findOne({ where: {id: req.params.id}});
    res.status(200).send(game);
  } catch (error) {
    next(error);
  }
});

router.get('/games', async (req,res,next) => {
  try {
    const games = await GamesModel.findAll();
    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
});

router.post('/games', async ( req, res, next) =>{
  try {
    const newGame = await GamesModel.create(req.body);
    res.status(200).send(newGame);
  } catch (error) {
    next(error);
  }
});

router.put('/games/:id', async (req,res,next) => {
  try {
    await GamesModel.update(req.body ,{ where: {id: req.params.id}});
    const newGame = await GamesModel.findOne({ where: {id: req.params.id}});
    res.status(200).send(newGame);
  } catch (error) {
    next(error);
  }
});

router.delete('/games/:id', async (req,res,next) => {
  try {
    await GamesModel.destroy({ where: {id: req.params.id}});
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
