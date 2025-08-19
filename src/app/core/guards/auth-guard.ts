import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJson = localStorage.getItem('user');
  const requireAuth = route.data?.['requireAuth'] ?? true;
  const roleRequired = route.data?.['role'];

  if (requireAuth && !userJson) {
    router.navigate(['/login']);
    return false;
  }

  if (userJson) {
    const user = JSON.parse(userJson);

    if (!requireAuth) {
      switch (user.role) {
        case 'Patient': router.navigate(['/app/patient']); break;
        case 'Doctor': router.navigate(['/app/doctor']); break;
        case 'Reception': router.navigate(['/app/reception']); break;
        case 'Admin': router.navigate(['/app/admin']); break;
      }
      return false;
    }
  }
  return true;
};
