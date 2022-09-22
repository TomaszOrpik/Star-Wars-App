import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export class AuthGuardMock implements CanActivate {
    canActivate = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => true;

}