"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var tournamentSchema = new mongoose.Schema({
    title: String,
    userList: [],
    children: [{
            type: Schema.Types.ObjectId,
            ref: 'Game'
        }]
});
var Tournament = mongoose.model('Tournament', tournamentSchema);
exports.default = Tournament;
//# sourceMappingURL=tournament.js.map