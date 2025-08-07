import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@services/user-service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const userService = inject(UserService)
  const router = inject(Router) 

  if(userService.isLogged()){
    return true
  }
  // router.navigate(['/sign-in'])
  return router.parseUrl('/sign-in')
  // return false
};
