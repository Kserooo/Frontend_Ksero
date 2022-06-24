import {AfterViewInit, Component, OnInit} from '@angular/core';

import {RetailSeller} from "../models/retail-seller";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";

import {Wholesaler} from "../models/wholesaler";
import {WholesalersService} from "../services/wholesalers/wholesalers.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit , AfterViewInit{
  warningAlert:boolean;

  userFormGroup= new FormGroup({
    username: new FormControl('',[Validators.required,
      Validators.minLength(6), Validators.maxLength(15)]),
    password: new FormControl('',[Validators.required,
      Validators.minLength(6), Validators.maxLength(15)]),
    email: new FormControl('',[Validators.required,
      Validators.email])
  });

  constructor(private retailSellerService: RetailSellersService, private wholesalerService: WholesalersService,
              private route:Router, private toastr: ToastrService) {
    this.warningAlert=false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  SubmitRegisterRetailSeller(){
    if(this.userFormGroup.valid){
      this.retailSellerService.getByUsername(this.userFormGroup.get('username')?.value).subscribe((response:any)=>{
        if(response.length==0){
          this.wholesalerService.getByUsername(this.userFormGroup.get('username')?.value).subscribe((response2:any)=>{
            if(response2.length==0){
              this.retailSellerService.create({
                username: this.userFormGroup.get('username')?.value,
                password: this.userFormGroup.get('password')?.value
              }).subscribe((response3:any)=>{
                this.toastr.success('Account successfully registered','Success');
                localStorage.setItem('token',"RetailSeller"+response3.id);
                this.route.navigate(['/retail-seller',response3.id,'profile']);
              });
            }
            else{
              this.toastr.error('Username actually registered','Error');
            }
          });
        }
        else{
          this.toastr.error('Username actually registered','Error');
        }
      });
    }
    else{
      this.toastr.error('Fix the errors first', 'Error');
    }
  }

  SubmitRegisterWholesaler() {
    if(this.userFormGroup.valid){
      this.wholesalerService.getByUsername(this.userFormGroup.get('username')?.value).subscribe((response:any)=>{
        if(response.length==0){
          this.retailSellerService.getByUsername(this.userFormGroup.get('username')?.value).subscribe((response2:any)=>{
            if(response2.length==0){
              this.wholesalerService.create({
                username: this.userFormGroup.get('username')?.value,
                password: this.userFormGroup.get('password')?.value
              }).subscribe((response3:any)=>{
                this.toastr.success('Account successfully registered','Success');
                localStorage.setItem('token',"Wholesaler"+response3.id);
                this.route.navigate(['/wholesaler',response3.id,'profile']);
              });
            }
            else{
              this.toastr.error('Username actually registered','Error');
            }
          })
        }
        else{
          this.toastr.error('Username actually registered','Error');
        }
      });
    }
    else{
      this.toastr.error('Fix the errors first', 'Error');
    }
  }
}
