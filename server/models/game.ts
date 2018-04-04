import * as mongoose from 'mongoose';
import Tournament from './tournament';
var Schema = mongoose.Schema;

const gameSchema = new mongoose.Schema({
    game_id: String,
    user1: String,
    user2: String,
    winner: String,
    round: String,
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Game'
    },
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }],
    siblings: [{
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }],
    tournament_title: String,
    tournament_id: {
      type: Schema.Types.ObjectId,
      ref: 'Tournament'
    },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
