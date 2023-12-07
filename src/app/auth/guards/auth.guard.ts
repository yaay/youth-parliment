import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return await authService.checkAuth()
    ? true
    : router.navigate(['/login'])

};
