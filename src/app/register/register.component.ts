import {AfterViewInit, Component, OnInit} from '@angular/core';

import {RetailSeller} from "../models/retail-seller";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";

import {Wholesaler} from "../models/wholesaler";
import {WholesalersService} from "../services/wholesalers/wholesalers.service";
import {ProductsService} from "../services/products/products.service";
import {UsersService} from "../services/users/users.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { DataTransferService } from '../utils/data-transfer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit , AfterViewInit{
  warningAlert:boolean;

  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  userFormGroup= new FormGroup({
    username: new FormControl('',[Validators.required,
      Validators.minLength(6), Validators.maxLength(15)]),
    password: new FormControl('',[Validators.required,
      Validators.minLength(6), Validators.maxLength(15)]),
    email: new FormControl('',[Validators.required, Validators.pattern(this.emailRegex)]),
    creditCardNumber: new FormControl('',[])
  });

  constructor(private retailSellerService: RetailSellersService, private wholesalerService: WholesalersService,
              private route:Router, private toastr: ToastrService,
              private usersService: UsersService,
              private productsService: ProductsService,
              private dataTransferService: DataTransferService
              ) {
    this.warningAlert=false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  redirect(){
    this.route.navigate(['/login']).then(r => console.log('redirect to register'));
  }

  SubmitRegisterRetailSeller(){
    if(!this.userFormGroup.valid) {
      this.toastr.info("Check your data and try again.", "Form fields data are not valid");
      return;
    }
    let role: string[] = ["ROLE_RETAIL_SELLER"];
    this.usersService.registerUser({
      username: this.userFormGroup.get('username')?.value,
      email: this.userFormGroup.get('email')?.value,
      password: this.userFormGroup.get('password')?.value,
      roles: role
    },
    ).subscribe((response: any) => {
      console.log(response);
      this.usersService.authenticateUser({
        username: this.userFormGroup.get('username')?.value,
        password: this.userFormGroup.get('password')?.value
      }
      ).subscribe((response2: any)=>{
        if(response2.id) {
          this.dataTransferService.userId = response.id.toString();
        }
        console.log(response2);
        localStorage.setItem('token',response2.token);
        this.retailSellerService.create({
          firstName: "",
          lastName: "",
          birthday: "",
          phone: "",
          address: "",
          description: "",
          username: this.userFormGroup.get('username')?.value,
          email: this.userFormGroup.get('email')?.value,
          password: this.userFormGroup.get('password')?.value,
          paymentName: "",
          paymentPhone: "",
          paymentEmail: "",
          paymentCardNumber: "",
          paymentExpirationDate: "",
          paymentCVV: ""
        }).subscribe((response3: any)=>{
          this.toastr.success('Account successfully registered', 'Success');
          this.route.navigate(['/retail-seller',response3.id,'profile']);
        })
      })
    });
  }

  SubmitRegisterWholesaler() {
    if(!this.userFormGroup.valid) {
      this.toastr.info("Check your data and try again.", "Form fields data are not valid");
      return;
    }
    if(this.userFormGroup.get('creditCardNumber')?.value === null || 
      this.userFormGroup.get('creditCardNumber')?.value === ''
      || this.userFormGroup.get('creditCardNumber')?.value === undefined) {
      this.toastr.info("Check your data and try again.", "If you want to register a wholesaler you need to enter a credit card number");
      return;
    }
    let role: string[] = ["ROLE_WHOLESALER"];
    this.usersService.registerUser({
      username: this.userFormGroup.get('username')?.value,
      email: this.userFormGroup.get('email')?.value,
      password: this.userFormGroup.get('password')?.value,
      roles: role
    }).subscribe((response: any) => {
      console.log(response);
      this.usersService.authenticateUser({
        username: this.userFormGroup.get('username')?.value,
        password: this.userFormGroup.get('password')?.value
      }).subscribe((response2: any)=>{
        if(response2.id) {
          this.dataTransferService.userId = response2.id.toString();
          this.dataTransferService.wholeSalerCreditCardNumber = response2.creditCardNumber;
        }
        console.log(response2);
        localStorage.setItem('token',response2.token);
        const wholesaverObj: Wholesaler =
          {
            firstName: "",
            lastName: "",
            birthday: "",
            phone: "",
            address: "",
            description: "",
            username: this.userFormGroup.get('username')?.value,
            email: this.userFormGroup.get('email')?.value,
            password: this.userFormGroup.get('password')?.value,
            creditCardNumber: this.userFormGroup.get('creditCardNumber')?.value,
          };
        console.log(wholesaverObj);
        this.wholesalerService.create(wholesaverObj).subscribe((response3: any)=>{
          this.toastr.success('Account successfully registered', 'Success');
          this.route.navigate(['/wholesaler',response3.id,'profile']);
          console.log(response3);
        });
      });
    });
  }
}
