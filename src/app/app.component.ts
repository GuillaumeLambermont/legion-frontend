import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule
import { PlayerService } from './player.service';
import { Player } from './player.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. Add FormsModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private playerService = inject(PlayerService);

  players = signal<Player[]>([]);
  singlePlayer = signal<Player | null>(null); // Signal for the searched player
  searchId: string = ''; // Property to bind to the input field

  ngOnInit() {
    this.loadAllPlayers();
  }

  loadAllPlayers() {
    this.playerService.getPlayers().subscribe({
      next: (data) => this.players.set(data),
      error: (err) => console.error('Fetch all failed:', err)
    });
  }

  // 3. Method to fetch a player by ID
  onSearchPlayer() {
    if (!this.searchId) return;

    this.playerService.getPlayer(this.searchId).subscribe({
      next: (player) => {
        this.singlePlayer.set(player);
      },
      error: (err) => {
        console.error('Player not found:', err);
        this.singlePlayer.set(null);
        alert('Player not found!');
      }
    });
  }
}