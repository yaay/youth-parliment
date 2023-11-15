import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const authenticated = inject(AuthService).checkUserStatus()

  console.log(authenticated)
  
  // console.log('guard status: ', inject(AuthService).authenticated());

  return authenticated
  ? true
  : inject(Router).navigate(['/login'])
  };
