import Tournament from '../models/tournament';
import BaseCtrl from './base';

export default class TournamentCtrl extends BaseCtrl {
  model = Tournament;

  addUser = (req, res) => {
            this.model.update({ _id: req.params.id }, { $push: { userList: req.body } }, function (err) {
                if (err) {
                    return console.error(err);
                }
                res.sendStatus(200);
            });
        };
}
