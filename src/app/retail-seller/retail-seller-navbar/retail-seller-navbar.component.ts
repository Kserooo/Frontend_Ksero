import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-retail-seller-navbar',
  templateUrl: './retail-seller-navbar.component.html',
  styleUrls: ['./retail-seller-navbar.component.css']
})
export class RetailSellerNavbarComponent implements OnInit {
  id:string ;
  constructor(private route:ActivatedRoute, private router: Router) {
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
  }

  Logout(): void{
    this.router.navigate(['']);
    localStorage.setItem('token','');
  }

}
