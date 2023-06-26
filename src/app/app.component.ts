import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { UserTypes } from './utils/user-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentRouteName: string = '';
  title = 'FrontendKsero';

  // Type
  userType!: number;

  availableRoutesForWholeSalerToolbar: string[] = [
    'wholesaler-profile',
    'wholesaler-products',
    'wholesaler-orders',
  ];

  availableRoutesForRetailSalerToolbar: string[] = [
    'retail-seller-profile',
    'retail-seller-orders',
    'retail-seller-payments',
    'retail-seller-products',
    'retail-seller-shopping-cart'
  ];



  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRouteName = this.getCurrentRouteName();
        //console.log(currentRouteName); // Display the current route name
      });
  }

  getCurrentRouteName(): string {
    let route = this.activatedRoute;
    while (route.firstChild) {
      // To the last child.
      route = route.firstChild;
    }
    return route.snapshot.data['name'];
  }

  showNavbar(): boolean {
    if(this.availableRoutesForWholeSalerToolbar.includes(this.getCurrentRouteName())) {
      this.userType = UserTypes.WholeSaler;
      return true;
    } else if(this.availableRoutesForRetailSalerToolbar.includes(this.getCurrentRouteName())) {
      this.userType = UserTypes.RetailSaler;
      return true;
    }
    return false;
  }
}
