import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '../../facades/auth/auth.facade';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router
  ) {}
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.authFacade.getUser() !== null) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
