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

  getTournament(id) {
  	console.log("Id: ",id)
  	this.tournament._id = id;
  	this.tournamentService.getTournament(this.tournament).subscribe(
      data => {
      	this.tournament = data;
      	console.log(this.tournament);
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
        console.log(this.games);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  ngOnDestroy() {
  }

}
