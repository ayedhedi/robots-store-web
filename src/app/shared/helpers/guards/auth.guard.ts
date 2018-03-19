import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {User} from "../../domain/user";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: any, state: RouterStateSnapshot) {
      let user:User = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
          //admin can og every where
          if (user.admin) {
            return true;
          }else {
            //access is authorized to only not admin pages
            if(!route.routeConfig.admin){
              return true;
            }else {
              this.router.navigate(['']);
              return false;
            }
          }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
