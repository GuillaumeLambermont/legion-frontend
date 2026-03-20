import { Component, inject } from '@angular/core';
import { AuthService } from '../../../authService/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }

}
