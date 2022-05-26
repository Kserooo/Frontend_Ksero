import { Component, OnInit } from '@angular/core';
import {RetailSeller} from "../models/retail-seller";
import {Wholesaler} from "../models/wholesaler";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";
import {WholesalersService} from "../services/wholesalers/wholesalers.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {ToastrService} from "ngx-toastr";

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

  constructor(
    private retailSellerService: RetailSellersService,
    private wholesalerService: WholesalersService,
    private route:Router,
    private toastr: ToastrService
  ) {
    this.id=2;
    this.retailSellerFound = {} as RetailSeller;
    this.wholesalerFound = {} as Wholesaler;
    this.showInvalidUserError = false;
  }

  ngOnInit(): void {

  }


  SubmitLogin(){
    if(!this.userFormGroup.invalid) {
      this.retailSellerService.signIn(this.userFormGroup.get('username')?.value, this.userFormGroup.get('password')?.value)
        .subscribe((response: any) => {
        if(response.length!=0){
          localStorage.setItem('token',"RetailSeller"+response[0].id);
          this.toastr.success('Login Successful','Success');
          this.route.navigate(['/retail-seller', response[0].id, 'profile']);
        }
        else{
          this.wholesalerService.signIn(this.userFormGroup.get('username')?.value, this.userFormGroup.get('password')?.value)
            .subscribe((response: any)=>{
              if(response.length!=0){
                localStorage.setItem('token',"Wholesaler"+response[0].id);
                this.toastr.success('Login Successful','Success');
                this.route.navigate(['/wholesaler', response[0].id, 'profile']);
              }
              else{
                this.toastr.error('Wrong username or password','Error');
              }
            })
        }
      })
    }

  }
}
