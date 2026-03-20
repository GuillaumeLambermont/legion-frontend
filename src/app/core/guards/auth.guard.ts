import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot, // Useful for redirecting back after login
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;
  const router = inject(Router);

  // Allow access to login page without authentication check
  if (route.routeConfig?.path === 'login') {
    return true;
  }

  // 1. FIRST CHECK: Is the user even logged in?
  if (!authenticated) {
    // If not logged in, send them to your welcome/login component
    return router.parseUrl('/login');
  }

  // 2. SECOND CHECK: Does this specific route require a role?
  const requiredRole = route.data['role'];

  // If no role is specified in the route data,
  // and they are authenticated (checked above), let them in!
  if (!requiredRole) {
    return true;
  }

  // 3. THIRD CHECK: Role validation
  const hasRequiredRole = (role: string): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role)) ||
    grantedRoles.realmRoles.includes(role); // Also check global realm roles

  if (hasRequiredRole(requiredRole)) {
    return true;
  }

  // 4. FINAL FALLBACK: Authenticated but doesn't have the right role
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);