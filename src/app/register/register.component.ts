import {AfterViewInit, Component, OnInit} from '@angular/core';

import {RetailSeller} from "../models/retail-seller";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";

import {Wholesaler} from "../models/wholesaler";
import {WholesalersService} from "../services/wholesalers/wholesalers.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit , AfterViewInit{
  retailSellerData: RetailSeller;
  wholesalerData: Wholesaler;
  warningAlert:boolean;

  constructor(private retailSellerService: RetailSellersService, private wholesalerService: WholesalersService,
              private route:Router) {
    this.retailSellerData = {} as RetailSeller;
    this.wholesalerData = {} as Wholesaler
    this.warningAlert=false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  SubmitRegisterRetailSeller(){
    this.retailSellerService.getByUsername(this.retailSellerData.username).subscribe((response:any)=>{
      if(response.length==0){
        this.wholesalerService.getByUsername(this.retailSellerData.username).subscribe((response2:any)=>{
          if(response2.length==0){
            this.retailSellerData.id=0;
            this.retailSellerService.create(this.retailSellerData).subscribe((response3:any)=>{
              this.route.navigate(['/retail-seller',response3.id,'profile']);
            });
          }
          else{
            this.warningAlert=true;
          }
        });
      }
      else{
        this.warningAlert=true;
      }
    });

  }

  SubmitRegisterWholesaler() {
    this.wholesalerService.getByUsername(this.retailSellerData.username).subscribe((response:any)=>{
      if(response.length==0){
        this.retailSellerService.getByUsername(this.retailSellerData.username).subscribe((response2:any)=>{
          if(response2.length==0){
            this.retailSellerData.id=0;
            this.wholesalerService.create(this.retailSellerData).subscribe((response3:any)=>{
              this.route.navigate(['/wholesaler',response3.id,'profile']);
            });
          }
          this.warningAlert=true;
        })
      }
      else{
        this.warningAlert=true;
      }
    });

  }
}
