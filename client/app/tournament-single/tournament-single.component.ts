import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TournamentService } from '../services/tournament.service';
import { GameService } from '../services/game.service';
import { Tournament } from '../shared/models/tournament.model';
import { ToastComponent } from '../shared/toast/toast.component';


@Component({
  selector: 'app-tournament-single',
  templateUrl: './tournament-single.component.html',
  styleUrls: ['./tournament-single.component.css']
})
export class TournamentSingleComponent implements OnInit, OnDestroy {

  tournament = new Tournament();
  games = [];
  isLoading = true;
  isEditing = false;
  round = 0;
  rounds = [];
  route$;
  id;

  constructor(private tournamentService: TournamentService,
          private gameService: GameService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(
            (params : Params) => {
                this.id = params["id"];
            }
        );

    this.getTournament(this.id);
    
  }

  select_winner(game, winner) {
    game.winner = winner;
    this.gameService.editGame(game).subscribe(
      () => {
        this.isEditing = false;
        this.toast.setMessage('game winner updated successfully.', 'success');
      },
      error => console.log(error)
    );

    var next_round_game = {
      game_id: undefined,
      user1: undefined,
      user2: undefined
    };

    next_round_game.game_id = game.tournament_id + "game#" + Math.ceil(game.game_of_round/2) + "round#" + (game.round + 1);
    console.log(game.game_of_round)
    if(game.game_of_round % 2 === 0) 
      next_round_game.user2 = game.winner
    else 
      next_round_game.user1 = game.winner
    this.update_next_round_game(next_round_game)
  }

  update_next_round_game(game) {
    this.gameService.update_next_round_game(game).subscribe(
      () => {
        this.isEditing = false;
        this.toast.setMessage('next round game updated successfully.', 'success');
        var game_holder = this.games.filter( x => {
          return game.game_id == x.game_id
        })[0];
        console.log(game_holder)
        console.log(game)
        if(game.user1)
          game_holder.user1 = game.user1;
        else
          game_holder.user2 = game.user2;
        console.log(this.games)
      },
      error => console.log(error)
    );
  }

  getTournament(id) {
  	console.log("Id: ",id)
  	this.tournament._id = id;
  	this.tournamentService.getTournament(this.tournament).subscribe(
      data => {
      	this.tournament = data;
        var round_counter = this.tournament.userList.length;
        while(round_counter > 1) {
          this.round++;
          this.rounds.push(this.round);
          round_counter = round_counter / 2;
        }
      },
      error => console.log(error),
      () => this.isLoading = false
    );
    this.getGames_by_tournament_id(id);
  }

  getGames_by_tournament_id(id) {
    this.gameService.getGames_by_tournament_id(id).subscribe(
      data => {
        this.games = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  ngOnDestroy() {
  }

}
