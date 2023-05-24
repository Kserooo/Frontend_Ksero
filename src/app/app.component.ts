import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentRouteName: string = '';
  title = 'FrontendKsero';


  availableRoutesForToolbar: string[] = ["wholesaler-profile", "wholesaler-products"];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

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
    while (route.firstChild) { // To the last child.
      route = route.firstChild;
    }
    return route.snapshot.data['name'];
  }

  showWholeSaler(): boolean {
    return this.availableRoutesForToolbar.includes(this.getCurrentRouteName());
  }


}
