import { Component, inject, OnInit, signal } from '@angular/core';
import { PlayerService } from './player.service';

export interface Player {
  id?: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-players',
  standalone: true,
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players implements OnInit {
  private playerService = inject(PlayerService);

  // Create a Signal to hold the array of players
  players = signal<Player[]>([]);

  ngOnInit() {
    this.loadAllPlayers();
  }

  loadAllPlayers() {
    this.playerService.getPlayers().subscribe({
      next: (data) => this.players.set(data),
      error: (err) => console.error('Fetch all failed:', err)
    });
  }
}