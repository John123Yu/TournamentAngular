import Game from '../models/game';
import BaseCtrl from './base';

export default class GameCtrl extends BaseCtrl {
  model = Game;

  initiate = (req, res) => {
    var userList = req.body.userList;
    var ogTitle = req.body.title;
    var tournament = req.body._id;
    var userListLen = userList.length;
    var possibleSizes = {
            traditional: [2,4,8,16,32],
        }
    var statusCode = 20 + userListLen.toString();
    for(var i=0; i<userListLen; i+=2) {
        let count = i;
        let user1 = userList[i];
        let user2 = userList[i+1];
        let title = ogTitle + count
        let game_id = tournament + count;
        console.log(statusCode)
        this.insert({
            game_id, user1, user2, tournament,
        }, res.sendStatus(statusCode));
    }
  }
}

