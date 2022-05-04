import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-retail-seller-navbar',
  templateUrl: './retail-seller-navbar.component.html',
  styleUrls: ['./retail-seller-navbar.component.css']
})
export class RetailSellerNavbarComponent implements OnInit {
  id:string ;
  constructor(private route:ActivatedRoute) {
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
  }

}
