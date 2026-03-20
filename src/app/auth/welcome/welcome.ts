
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/authService/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  // Inject your wrapper service
  private authService = inject(AuthService);

  onLogin() {
    this.authService.login();
  }

  onRegister() {
    this.authService.register();
  }
}