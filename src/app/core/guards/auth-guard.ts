import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJson = localStorage.getItem('user');
  console.log('userJson ', userJson)

  if (!userJson) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
