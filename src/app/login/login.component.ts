import { Component, OnInit } from '@angular/core';
import {RetailSeller} from "../models/retail-seller";
import {Wholesaler} from "../models/wholesaler";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";
import {WholesalersService} from "../services/wholesalers/wholesalers.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {
  showInvalidUserError: boolean;
  userFormGroup= new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  id: number;
  retailSellerFound: RetailSeller;

  wholesalerFound: Wholesaler;

  constructor(private retailSellerService: RetailSellersService, private wholesalerService: WholesalersService,
              private route:Router) {
    this.id=2;
    this.retailSellerFound = {} as RetailSeller;
    this.wholesalerFound = {} as Wholesaler;
    this.showInvalidUserError = false;
  }

  ngOnInit(): void {

  }


  SubmitLogin(){
    if(!this.userFormGroup.invalid){
      this.retailSellerService.getByUsername(this.userFormGroup.get('username')?.value).subscribe((retailSelleresponse: any) => {
        if (retailSelleresponse.length > 0) {
          this.retailSellerFound = retailSelleresponse[0];
          if (this.retailSellerFound.password == this.userFormGroup.get('password')?.value) {
            this.route.navigate(['/retail-seller',this.retailSellerFound.id,'profile'])
            console.log("Login Successful as a Retail-Seller !!");
          } else {
            console.log("Wrong Username or Password !!");
          }
        }
      })

      this.wholesalerService.getByUsername(this.userFormGroup.get('username')?.value).subscribe((wholeSaleresponse: any) => {
        if (wholeSaleresponse.length > 0) {
          this.wholesalerFound = wholeSaleresponse[0];
          if (this.wholesalerFound.password == this.userFormGroup.get('password')?.value) {
            this.route.navigate(['/wholesaler',this.wholesalerFound.id,'profile']);
            console.log("Login Successful as a WholeSaler !!");
          } else {
            console.log("Wrong Username or Password !!");
            this.showInvalidUserError = true;
          }
        }
        else{
          this.showInvalidUserError = true;
        }
      })
    }
    else{

    }

  }
}
