import Game from '../models/game';
import BaseCtrl from './base';

export default class GameCtrl extends BaseCtrl {
  model = Game;

  getGames_by_tournament_id = (req, res) => {
  	console.log(req.params)
    this.model.find({
      tournament_id: req.params.id
    }, (err, games) => {
      if (err) { return console.error(err); }
      res.json(games);
    });
  }

  update_next_round_game = (req, res) => {
    console.log("HERE :", req.body)
    this.model.findOne({
      game_id: req.body.game_id
    }, (err, game) => {
      if (err) { return console.error(err); }
      if(game) {
        if(req.body.user1) 
          game.user1 = req.body.user1;
        if(req.body.user2) 
          game.user2 = req.body.user2;
        game.save();
        res.sendStatus(200);
      } else {
        return console.error('game not found');
      }
    });
  }
}