import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    // console.log('isAuth fora', isAuth);

    if (!isAuth) {
      // console.log('isAuth dentro', isAuth);
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
