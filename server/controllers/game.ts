import Game from '../models/game';
import BaseCtrl from './base';

export default class GameCtrl extends BaseCtrl {
  model = Game;

  initiate = (req, res) => {
    var userList = req.body.userList;
    var title = req.body.title;
    var tournament = req.body.tournament;
    var userListLen = userList.length;
    var possibleSizes = {
            traditional: [2,4,8,16,32],
        }
    var count = 0;
    for(var i=0; i<userListLen; i+=2) {
        count++;
        this.insert({
            game_id: title + count,
            user1: userList[i],
            user2: userList[i+1],
            tournament: tournament,
        }, res)
    }
  }
}

