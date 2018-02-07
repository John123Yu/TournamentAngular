import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TournamentService } from '../services/tournament.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Tournament } from '../shared/models/tournament.model';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class AppComponent {

  tournament = new Tournament();
  tournaments: Tournament[] = [];
  users = [];
  isLoading = true;
  isEditing = false;

  addTournamentForm: FormGroup;
  title = new FormControl('', Validators.required);
  user = new FormControl('', Validators.required);

  constructor(private tournamentService: TournamentService,
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

  addUser(user: String) {
  	this.tournamentService.addUser(this.addUserForm.value).suscribe(
  	  res => {
  	    this.users.push(res);
  	    this.addUserForm.reset();
  	    this.toast.setMessage('item added successfully.', 'success');
  	  },
  	  error => console.log(error)
  	);
  }
}
