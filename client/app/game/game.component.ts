import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { GameService } from '../services/game.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Game } from '../shared/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game = new Game();
  games: Game[] = [];
  isLoading = true;
  isEditing = false;

  addGameForm: FormGroup;
  user1 = new FormControl('', Validators.required);
  user2 = new FormControl('', Validators.required);

  constructor(private gameService: GameService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getGames();
    this.addGameForm = this.formBuilder.group({
      user1: this.user1,
      user2: this.user2
    });
  }

  getGames() {
    this.gameService.getGames().subscribe(
      data => this.games = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  //Not really needed for a very simple implementation of tournament
  addGame() {
    this.gameService.addGame(this.addGameForm.value).subscribe(
      res => {
        this.games.push(res);
        this.addGameForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }


}
