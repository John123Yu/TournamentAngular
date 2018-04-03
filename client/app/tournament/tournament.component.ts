import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TournamentService } from '../services/tournament.service';
import { GameService } from '../services/game.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Tournament } from '../shared/models/tournament.model';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournament = new Tournament();
  tournaments: Tournament[] = [];
  users = [];
  isLoading = true;
  isEditing = false;

  addTournamentForm: FormGroup;
  addUserForm: FormGroup;
  title = new FormControl('', Validators.required);
  user = new FormControl('', Validators.required);

  constructor(private tournamentService: TournamentService,
  			  private gameService: GameService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getTournaments();
    this.addTournamentForm = this.formBuilder.group({
      title: this.title,
    });
    this.addUserForm = this.formBuilder.group({
      user: this.user,
    });
  }

  getTournaments() {
    this.tournamentService.getTournaments().subscribe(
      data => this.tournaments = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(tournament: Tournament) {
    this.isEditing = true;
    this.tournament = tournament;
  }

  cancelEditing() {
    this.isEditing = false;
    this.tournament = new Tournament();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the tournaments to reset the editing
    this.getTournaments();
  }

  editTournament(tournament: Tournament) {
    this.tournamentService.editTournament(tournament).subscribe(
      () => {
        this.isEditing = false;
        this.tournament = tournament;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  editTournamentFromForm(tournament: Tournament) {
    console.log(tournament);
  	//tournament.userList = tournament.userList.split(',');
  	console.log(tournament);
    this.tournamentService.editTournament(tournament).subscribe(
      () => {
        this.isEditing = false;
        this.tournament = tournament;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteTournament(tournament: Tournament) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.tournamentService.deleteTournament(tournament).subscribe(
        () => {
          const pos = this.tournaments.map(elem => elem._id).indexOf(tournament._id);
          this.tournaments.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  addTournament() {
    this.tournamentService.addTournament(this.addTournamentForm.value).subscribe(
      res => {
        this.tournaments.push(res);
        this.addTournamentForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  addUser(tournament: Tournament, index) {
  	this.tournamentService.addUser(this.addUserForm.value, tournament).subscribe(
  	  res => {
  	    this.getTournaments();
  	    this.addUserForm.reset();
  	    this.toast.setMessage('item added successfully.', 'success');
  	  },
  	  error => console.log(error)
  	);
  }

  initiateTournament(tournament: Tournament) {
    tournament.initiated = true;
    var userList = tournament.userList;
    var tournament_title = tournament.title;
    var tournament_id = tournament._id
    var possibleSizes = {
            traditional: [2,4,8,16,32],
        }
    for(var i=0; i<userList.length; i+=2) {
        let count = i;
        let user1 = userList[i];
        let user2 = userList[i+1];
        let title = tournament_title + "#" + count
        let game_id = tournament_id + "#" + count;
        let game = {
        	game_id, user1, user2, tournament_id, tournament_title
        }
	    this.gameService.addGame(game).subscribe(
	      res => {
	      },
	      error => console.log(error)
	    );
    }
    console.log(tournament)
    this.editTournament(tournament);
  }
}