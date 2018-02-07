Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var Game = Game_1.default;

var mongoose = require("mongoose");
var tournamentSchema = new mongoose.Schema({
    title: string,
    userList: [],
    child: {
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }
});
var Tournament = mongoose.model('Tournament', tournamentSchema);
exports.default = Game;
//# sourceMappingURL=tournament.js.map