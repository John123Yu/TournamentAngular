import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Game } from '../shared/models/game.model';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/api/games');
  }

  getGames_by_tournament_id(id): Observable<Game[]> {
    return this.http.get<Game[]>(`/api/games/${id}`);
  }

  countGames(): Observable<number> {
    return this.http.get<number>('/api/games/count');
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>('/api/game', game);
  }

  getGame(game: Game): Observable<Game> {
    return this.http.get<Game>(`/api/game/${game._id}`);
  }

  editGame(game: Game): Observable<string> {
    return this.http.put(`/api/game/${game._id}`, game, { responseType: 'text' });
  }

  deleteGame(game: Game): Observable<string> {
    return this.http.delete(`/api/game/${game._id}`, { responseType: 'text' });
  }
}
