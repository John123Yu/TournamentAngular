"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var gameSchema = new mongoose.Schema({
    game_id: String,
    user1: String,
    user2: String,
    winner: String,
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
    tournament: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament'
    },
});
var Game = mongoose.model('Game', gameSchema);
exports.default = Game;
//# sourceMappingURL=game.js.map