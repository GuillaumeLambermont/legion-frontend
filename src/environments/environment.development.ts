// Work locally OUTSIDE home network
// Change Keycloak > Realms settings > frontend URL : https://auth.corsac.be

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  keycloakClientId: 'legion-frontend-dev', 
  keycloakRealm: 'legion-dev',           
  keycloakUrl: 'https://auth.corsac.be',
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i
};