import { Component, inject } from '@angular/core';
import { AuthService } from '../../../authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);


  onHome() {
    this.router.navigate(['/home']);
  }

  goToPlayers() {
    this.router.navigate(['/players']);
  }

  onLogout() {
    this.authService.logout();
  }

  onArtWork() {
    this.router.navigate(['/artwork']);
  }

}
