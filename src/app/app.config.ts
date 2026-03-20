import { provideRouter } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  UserActivityService,
  AutoRefreshTokenService,
  withAutoRefreshToken
} from 'keycloak-angular';

import { routes } from './app.routes';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
      config: {
        url: 'http://192.168.1.41:8080',
        realm: 'legion-dev',
        clientId: 'legion-frontend-dev'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        //silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 3600000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition] // <-- Note that multiple conditions might be added.
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor]))
  ]
};