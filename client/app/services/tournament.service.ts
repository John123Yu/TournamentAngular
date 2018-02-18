import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Tournament } from '../shared/models/tournament.model';

@Injectable()
export class TournamentService {

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>('/api/tournaments');
  }

  countTournaments(): Observable<number> {
    return this.http.get<number>('/api/tournaments/count');
  }

  addTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>('/api/tournament', tournament);
  }

  getTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.get<Tournament>(`/api/tournament/${tournament._id}`);
  }

  editTournament(tournament: Tournament): Observable<string> {
    return this.http.put(`/api/tournament/${tournament._id}`, tournament, { responseType: 'text' });
  }

  deleteTournament(tournament: Tournament): Observable<string> {
    return this.http.delete(`/api/tournament/${tournament._id}`, { responseType: 'text' });
  }

  addUser(user: String, tournament: Tournament): Observable<string> {
    return this.http.put<string>(`/api/tournament/addUser/${tournament._id}`, user);
  }
}
