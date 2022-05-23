import { Component, OnInit } from '@angular/core';
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {ActivatedRoute} from "@angular/router";
import {RetailSeller} from "../../models/retail-seller";
import {MatDialog} from "@angular/material/dialog";
import {
  RetailSellerProfileDialogUpdateComponent
} from "./retail-seller-profile-dialog-update/retail-seller-profile-dialog-update.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-retail-seller-profile',
  templateUrl: './retail-seller-profile.component.html',
  styleUrls: ['./retail-seller-profile.component.css']
})
export class RetailSellerProfileComponent implements OnInit {
  id:string;
  retailSellerActual: RetailSeller;

  userFormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    birthday: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  });

  constructor(private retailSellersService: RetailSellersService, private route: ActivatedRoute,
              private dialog: MatDialog, private toastr:ToastrService) {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.retailSellerActual={} as RetailSeller;
  }

  ngOnInit(): void {
    this.getActualData();
  }

  getActualData():void{
    this.retailSellersService.getById(this.id).subscribe((response:any)=>{
      this.retailSellerActual = response;
      this.userFormGroup.setValue({
        firstName: this.retailSellerActual.firstName ? this.retailSellerActual.firstName : '',
        lastName: this.retailSellerActual.lastName ? this.retailSellerActual.lastName : '',
        birthday: this.retailSellerActual.birthday ? this.retailSellerActual.birthday : '',
        phone: this.retailSellerActual.phone ? this.retailSellerActual.phone : '',
        email: this.retailSellerActual.email ? this.retailSellerActual.email : '',
        address: this.retailSellerActual.address ? this.retailSellerActual.address : '',
        password: this.retailSellerActual.password ? this.retailSellerActual.password : '',
        description: this.retailSellerActual.description ? this.retailSellerActual.description : ''
      });
    })
  }

  openDialog(): void {
    if(this.userFormGroup.valid){
      this.retailSellerActual.firstName = this.userFormGroup.get('firstName')?.value;
      this.retailSellerActual.lastName = this.userFormGroup.get('lastName')?.value;
      this.retailSellerActual.birthday = this.userFormGroup.get('birthday')?.value;
      this.retailSellerActual.phone = this.userFormGroup.get('phone')?.value;
      this.retailSellerActual.email = this.userFormGroup.get('email')?.value;
      this.retailSellerActual.address = this.userFormGroup.get('address')?.value;
      this.retailSellerActual.password = this.userFormGroup.get('password')?.value;
      this.retailSellerActual.description = this.userFormGroup.get('description')?.value;


      const dialogRef=this.dialog.open(RetailSellerProfileDialogUpdateComponent,{
        data:{...this.retailSellerActual}
      });

      dialogRef.afterClosed().subscribe((result :any) =>{
        if(result!=undefined){
          this.retailSellersService.update(Number(this.id),this.retailSellerActual).subscribe(response=>{
            this.toastr.success('Information Saved','Success')
            this.getActualData();
          })
        }
      })
    }
    else{
      this.toastr.error('Fix the errors first', 'Error');
    }
  }
}
