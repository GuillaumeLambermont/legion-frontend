import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core'; // Add ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { PlayerService } from './player.service';
import { Player } from './player.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private playerService = inject(PlayerService);
  private cdr = inject(ChangeDetectorRef); // Inject the change detector

  players = signal<Player[]>([]);

  ngOnInit() {
    console.log('App started, calling service...');
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        console.log('Pushing data to signal:', data);
        this.players.set(data);
        this.cdr.detectChanges(); // FORCE the UI to update immediately
      },
      error: (err) => console.error('Service call failed:', err)
    });
  }
}
