import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    if(!user) {
      return true;
    } else {
      if(user.roles.includes("ROLE_WHOLESALER"))
        this.router.navigate(['/wholesaler/profile'])
      else if(user.roles.includes("ROLE_RETAIL_SELLER"))
        this.router.navigate(['/retail-seller/profile'])
      return false;
    }
  }

}
