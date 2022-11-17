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

    const permission = this.authService.getPermission();

    console.log(permission);

    // if (permission === 'Comum') {
    //   if (state.url.includes('/usuarios')) {
    //     // this.router.navigate(['/endpointsComplete']);
    //     return false;
    //   } else if (state.url.includes('/signup')) {
    //     // this.router.navigate(['/endpointsComplete']);
    //     return false;
    //   }
    // }

    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
