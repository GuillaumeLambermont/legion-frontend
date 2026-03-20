import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { canActivateAuthRole } from './core/guards/auth.guard';
import { Welcome } from './auth/welcome/welcome';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./auth/welcome/welcome').then(m => m.Welcome) 
  },
  {
    path: '',
    component: Layout,
    canActivate: [canActivateAuthRole], 
    children: [
      { 
        path: 'home', 
        loadComponent: () => import('./pages/home/home').then(m => m.Home) 
      },
      { 
        path: 'players', 
        loadComponent: () => import('./pages/players/players').then(m => m.Players) 
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'home' }
];