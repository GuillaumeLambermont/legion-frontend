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

  // signal used for the "add new player" form.  start with empty strings;
  // `id` is undefined until the server assigns one.
  newPlayer = signal<Partial<Player>>({ username: '', email: '' });

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

  /** called when the "add player" form is submitted */
  createPlayer() {
    const payload = this.newPlayer();
    if (!payload.username || !payload.email) {
      alert('Both username and email are required');
      return;
    }

    this.playerService.addPlayer(payload).subscribe({
      next: (created) => {
        // update the list so user sees the new entry immediately
        this.players.update(list => [...list, created]);
        // clear the form
        this.newPlayer.set({ username: '', email: '' });
      },
      error: (err) => {
        console.error('Failed to add player', err);
        alert('Could not create player');
      }
    });
  }
}