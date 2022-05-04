import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-wholesaler-navbar',
  templateUrl: './wholesaler-navbar.component.html',
  styleUrls: ['./wholesaler-navbar.component.css']
})
export class WholesalerNavbarComponent implements OnInit {

  id:string;
  constructor(private route:ActivatedRoute) {
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
  }

}
