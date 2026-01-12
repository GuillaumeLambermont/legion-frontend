import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // Added this
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Add this line!
    provideRouter(routes),
    provideHttpClient()
  ]
};
