import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/players`

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  getPlayer(id: number | string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  addPlayer(player: Partial<Player>): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(id: number | string, player: Partial<Player>) {
    return this.http.put<Player>(this.apiUrl, player);
  }

  deletePlayer(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
