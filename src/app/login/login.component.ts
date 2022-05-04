import { Component, OnInit } from '@angular/core';
import {RetailSeller} from "../models/retail-seller";
import {Wholesaler} from "../models/wholesaler";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";
import {WholesalersService} from "../services/wholesalers/wholesalers.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {
  id: number;
  user: RetailSeller;
  retailSellerFound: RetailSeller;

  wholesalerData: Wholesaler;
  wholesalerFound: Wholesaler;

  constructor(private retailSellerService: RetailSellersService, private wholesalerService: WholesalersService,
              private route:Router) {
    this.id=2;
    this.user = {} as RetailSeller;
    this.retailSellerFound = {} as RetailSeller;
    this.wholesalerData = {} as Wholesaler;
    this.wholesalerFound = {} as Wholesaler;
  }

  ngOnInit(): void {

  }


  SubmitLogin(){
    this.retailSellerService.getByUsername(this.user.username).subscribe((retailSelleresponse: any) => {
      if (retailSelleresponse.length > 0) {
        this.retailSellerFound = retailSelleresponse[0];
        if (this.retailSellerFound.password == this.user.password) {
          this.route.navigate(['/retail-seller',this.retailSellerFound.id,'profile'])
          console.log("Login Successful as a Retail-Seller !!");
        } else {
          console.log("Wrong Username or Password !!");
        }
      }
    })

    this.wholesalerService.getByUsername(this.user.username).subscribe((wholeSaleresponse: any) => {
      if (wholeSaleresponse.length > 0) {
        this.wholesalerFound = wholeSaleresponse[0];
        if (this.wholesalerFound.password == this.user.password) {
          this.route.navigate(['/wholesaler',this.wholesalerFound.id,'profile']);
          console.log("Login Successful as a WholeSaler !!");
        } else {
          console.log("Wrong Username or Password !!");
        }
      }
    })
  }
}
