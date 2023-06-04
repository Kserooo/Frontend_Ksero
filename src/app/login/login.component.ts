import { Component, OnInit } from '@angular/core';
import {RetailSeller} from "../models/retail-seller";
import {Wholesaler} from "../models/wholesaler";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";
import {WholesalersService} from "../services/wholesalers/wholesalers.service";
import {UsersService} from "../services/users/users.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import {first} from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {
  showInvalidUserError: boolean;
  userFormGroup= new FormGroup({
    username: new FormControl('',[Validators.required, Validators.maxLength(15)]),
    password: new FormControl('',[Validators.required])
  });
  id: number;
  retailSellerFound: RetailSeller;

  wholesalerFound: Wholesaler;

  constructor(
    private retailSellerService: RetailSellersService,
    private wholesalerService: WholesalersService,
    private route: Router,
    private toastr: ToastrService,
    private usersService: UsersService
  ) {
    this.id=2;
    this.retailSellerFound = {} as RetailSeller;
    this.wholesalerFound = {} as Wholesaler;
    this.showInvalidUserError = false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    UsersService.toastr = this.toastr;
  }

  redirect(){

    this.route.navigate(['/register']).then(r => console.log('redirect to register'));
  }

  SubmitLogin(){
    if(this.userFormGroup.valid){
      this.usersService.authenticateUser({
        username: this.userFormGroup.get('username')?.value,
        password: this.userFormGroup.get('password')?.value,
      }).subscribe((response:any)=>{
        console.log(response);
        localStorage.setItem('token',response.token);
        this.retailSellerService.getByUsername(response.username).subscribe((response3: any)=>{
          console.log(response3);
          this.toastr.success('Login As Retail Seller Successful','Success');
          this.route.navigate(['/retail-seller',response3.id,'profile']);
        })
        this.wholesalerService.getByUsername(response.username).subscribe((response3: any)=>{
          this.toastr.success('Login As Wholesaler Successful','Success');
          this.route.navigate(['/wholesaler',response3.id,'profile']);
        })
      })
    }
  }
}
