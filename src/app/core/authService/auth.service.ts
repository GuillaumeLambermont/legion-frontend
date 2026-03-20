import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import Keycloak from 'keycloak-js'; // Import the official JS class
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  // 1. Inject the core Keycloak instance directly
  private readonly keycloak = inject(Keycloak);
  private readonly router = inject(Router);

  // 2. State managed via Signals
  readonly isAuthenticated = signal(this.keycloak.authenticated || false);
  
  // 3. Computed signal for the user profile
  readonly profile = signal(this.keycloak.profile);
  
  readonly username = computed(() => this.profile()?.username || 'Guest');

  constructor() {
    // Listen for Keycloak events to update authentication state
    this.keycloak.onAuthSuccess = () => {
      this.isAuthenticated.set(true);
      this.profile.set(this.keycloak.profile);
    };

    this.keycloak.onAuthLogout = () => {
      this.isAuthenticated.set(false);
      this.profile.set(undefined);
    };

    this.keycloak.onTokenExpired = () => {
      this.keycloak.updateToken(70).catch(() => {
        this.logout();
      });
    };
  }

  ngOnDestroy() {
    // Clean up event listeners if needed
  }

  async login() {
    await this.keycloak.login({
      redirectUri: window.location.origin + '/home'
    });
  }

  async logout() {
    await this.keycloak.logout({
      redirectUri: window.location.origin + '/login'
    });
  }

  async register() {
    await this.keycloak.login({
      action: 'register',
      redirectUri: window.location.origin + '/home'
    });
    const userProfile = await this.keycloak.loadUserProfile();
    console.log(userProfile.id);
  }

  // Helper to get the raw token for manual fetch calls
  get token() {
    return this.keycloak.token;
  }

  // Check if user is authenticated
  get authenticated(): boolean {
    return this.keycloak.authenticated || false;
  }
}