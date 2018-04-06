"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cat_1 = require("./controllers/cat");
var game_1 = require("./controllers/game");
var tournament_1 = require("./controllers/tournament");
var user_1 = require("./controllers/user");
function setRoutes(app) {
    var router = express.Router();
    var catCtrl = new cat_1.default();
    var gameCtrl = new game_1.default();
    var tournamentCtrl = new tournament_1.default();
    var userCtrl = new user_1.default();
    // Cats
    router.route('/cats').get(catCtrl.getAll);
    router.route('/cats/count').get(catCtrl.count);
    router.route('/cat').post(catCtrl.insert);
    router.route('/cat/:id').get(catCtrl.get);
    router.route('/cat/:id').put(catCtrl.update);
    router.route('/cat/:id').delete(catCtrl.delete);
    // Game
    router.route('/games').get(gameCtrl.getAll);
    router.route('/games/:id').get(gameCtrl.getGames_by_tournament_id);
    router.route('/games/count').get(gameCtrl.count);
    router.route('/game').post(gameCtrl.insert);
    router.route('/game/:id').get(gameCtrl.get);
    router.route('/game/:id').put(gameCtrl.update);
    router.route('/game/:id').delete(gameCtrl.delete);
    router.route('/game/next_round').post(gameCtrl.update_next_round_game);
    // Tournaments
    router.route('/tournaments').get(tournamentCtrl.getAll);
    router.route('/tournaments/count').get(tournamentCtrl.count);
    router.route('/tournament').post(tournamentCtrl.insert);
    router.route('/tournament/:id').get(tournamentCtrl.get);
    router.route('/tournament/:id').put(tournamentCtrl.update);
    router.route('/tournament/:id').delete(tournamentCtrl.delete);
    router.route('/tournament/addUser/:id').put(tournamentCtrl.addUser);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map