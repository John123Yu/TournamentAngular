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
}

