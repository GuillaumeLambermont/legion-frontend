// Work locally INSIDE home network
// Change Keycloak > Realms settings > frontend URL : http://192.168.1.41:8080

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  keycloakClientId: 'legion-frontend-dev',
  keycloakRealm: 'legion-dev',           
  keycloakUrl: 'http://192.168.1.41:8080',
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i
};
