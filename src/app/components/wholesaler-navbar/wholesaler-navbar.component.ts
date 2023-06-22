import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { DataTransferService } from 'src/app/utils/data-transfer.service';

@Component({
  selector: 'app-wholesaler-navbar',
  templateUrl: './wholesaler-navbar.component.html',
  styleUrls: ['./wholesaler-navbar.component.css']
})
export class WholesalerNavbarComponent implements OnInit {

  id:string;
  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService
    ) {
    this.id=this.dataTransferService.userId;
  }

  ngOnInit(): void {
  }

  Logout(): void{
    this.router.navigate(['']);
    localStorage.setItem('token','');
  }

}
