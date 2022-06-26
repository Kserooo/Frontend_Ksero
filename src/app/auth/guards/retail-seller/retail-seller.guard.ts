import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetailSellerGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = "Retailseller2"

    return true;
    if(token && token.charAt(0)=='R'){
      return true;
    }

    this.router.navigate([``]);
    return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = "Retailseller2"
    return true;

    if(token && token.charAt(0)=='R'){
      return true;
    }

    this.router.navigate([``]);
    return false;
  }

}
