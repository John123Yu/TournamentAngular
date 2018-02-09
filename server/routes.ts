import * as express from 'express';

import CatCtrl from './controllers/cat';
import GameCtrl from './controllers/game';
import TournamentCtrl from './controllers/tournament';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import Game from './models/game';
import tournament from './models/Tournament';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const gameCtrl = new GameCtrl();
  const tournamentCtrl = new TournamentCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Game
  router.route('/games').get(gameCtrl.getAll);
  router.route('/games/count').get(gameCtrl.count);
  router.route('/game').post(gameCtrl.insert);
  router.route('/game/:id').get(gameCtrl.get);
  router.route('/game/:id').put(gameCtrl.update);
  router.route('/game/:id').delete(gameCtrl.delete);

  // Tournaments
  router.route('/tournaments').get(tournamentCtrl.getAll);
  router.route('/tournaments/count').get(tournamentCtrl.count);
  router.route('/tournament').post(tournamentCtrl.insert);
  router.route('/tournament/:id').get(tournamentCtrl.get);
  router.route('/tournament/:id').put(tournamentCtrl.update);
  router.route('/tournament/:id').delete(tournamentCtrl.delete);

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
