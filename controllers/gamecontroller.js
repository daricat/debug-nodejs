const router = require('express').Router();

const { sequelize, Sequelize } = require('../db');
const Game = require('../models/game')(sequelize, Sequelize);

const ROUTER_PATHS = {
  GET_ALL_GAMES: '/all',
  GET_GAME_BY_ID: '/:id',
  CREATE_GAME: '/create',
  UPDATE_GAME_BY_ID: '/update/:id',
  REMOVE_GAME_BY_ID: '/remove/:id',
}

router.get(ROUTER_PATHS.GET_ALL_GAMES, (req, res) => {
  Game.findAll({ where: { owner_id: req.body.user.id } })
    .then((data) => {
      res.status(200).json({
        games: data,
        message: "Data fetched."
      })
    })
    .catch(() => res.status(500).json({message: "Data not found"}));
})

router.get(ROUTER_PATHS.GET_GAME_BY_ID, (req, res) => {
  Game.findOne({where: { 
    id: req.params.id,
    owner_id: req.body.user.id
  }})
    .then((game) => res.status(200).json({ game: game }))
    .catch((err) => res.status(500).json({ message: "Data not found." }));
})

router.post(ROUTER_PATHS.CREATE_GAME, (req, res) => {
  Game.create({
    title: req.body.game.title,
    owner_id: req.body.user.id,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played
  })
    .then((game) => res.status(200).json({
      game: game,
      message: "Game created."
    }))
    .catch((err) => res.status(500).send(err.message));
})

router.put(ROUTER_PATHS.UPDATE_GAME_BY_ID, (req, res) => {
  Game.update({
    title: req.body.game.title,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played
  },
  {
    where: {
      id: req.params.id,
      owner_id: req.user
    }
  })
    .then((game) => res.status(200).json({
      game: game,
      message: "Successfully updated."
    }))
    .cath((err) => res.status(500).json({message: err.message}));
})

router.delete(ROUTER_PATHS.REMOVE_GAME_BY_ID, (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      owner_id: req.body.user.id
    }
  })
    .then((game) => res.status(200).json({
      game: game,
      message: "Successfully deleted"
    }))
    .cath((err) => res.status(500).json({error: err.message}));
})

module.exports = router;
