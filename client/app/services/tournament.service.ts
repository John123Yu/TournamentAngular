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

  addTournament(Tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>('/api/tournament', tournament);
  }

  getTournament(Tournament: Tournament): Observable<Tournament> {
    return this.http.get<Tournament>(`/api/tournament/${tournament._id}`);
  }

  editTournament(Tournament: Tournament): Observable<string> {
    return this.http.put(`/api/tournament/${tournament._id}`, tournament, { responseType: 'text' });
  }

  deleteTournament(Tournament: Tournament): Observable<string> {
    return this.http.delete(`/api/tournament/${tournament._id}`, { responseType: 'text' });
  }

  addUser(User: String): Observable<Tournament[]> {
    return this.http.put<Tournament[]>(`/api/tournament/addUser/${tournament._id}`, user, { responseType: 'text'});
  }

}
