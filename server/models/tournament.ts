import * as mongoose from 'mongoose';
import Game from './game';

var Schema = mongoose.Schema;

const tournamentSchema = new mongoose.Schema({
    title: String,
    userList: [],
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }]
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;