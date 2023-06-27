import { Component, OnInit } from '@angular/core';
import {RetailSeller} from "../../models/retail-seller";
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {ActivatedRoute} from "@angular/router";
import {
  RetailSellerPaymentDialogUpdateComponent
} from "./retail-seller-payment-dialog-update/retail-seller-payment-dialog-update.component";

import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-retail-seller-payment',
  templateUrl: './retail-seller-payment.component.html',
  styleUrls: ['./retail-seller-payment.component.css']
})
export class RetailSellerPaymentComponent implements OnInit {
  id: string;
  retailSeller: RetailSeller;
  paymentCardNumberEncrypted: string;

  phoneNumberRegexp: RegExp = /^9\d{8}$/;
  nameRegexp: RegExp = /^(?!^\s+$)[a-zA-ZáÁéÉíÍóÓúÚñÑ\s]+$/;
  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor(private retailSellersService: RetailSellersService, private route: ActivatedRoute,
              private dialog: MatDialog, private toastr: ToastrService) {
    this.retailSeller= {} as RetailSeller;
    this.id= JSON.parse(localStorage.getItem("user")!).id;
    this.paymentCardNumberEncrypted= '';
  }

  userFormGroup= new FormGroup({
    paymentName: new FormControl('',[Validators.required,
      Validators.minLength(2), Validators.maxLength(25), Validators.pattern(this.nameRegexp)]),
    paymentPhone: new FormControl('',[Validators.required,
      Validators.pattern(this.phoneNumberRegexp)]),
    paymentEmail: new FormControl('',[Validators.required,
      Validators.pattern(this.emailRegex)]),
    paymentCardNumber: new FormControl('',[Validators.required,
      Validators.pattern('^[0-9]{16}$')]),
    paymentExpirationDate: new FormControl('',[Validators.required]),
    paymentCVV: new FormControl('',[Validators.required,
      Validators.pattern('^[0-9]{3}$')])
  });

  ngOnInit(): void {
    this.retailSellersService.getById(this.id).subscribe((response:any)=>{
      this.retailSeller=response;
      console.log(this.retailSeller);
      this.userFormGroup.setValue({
        paymentName: this.retailSeller.paymentName ? this.retailSeller.paymentName : '',
        paymentPhone: this.retailSeller.paymentPhone ? this.retailSeller.paymentPhone : '',
        paymentEmail: this.retailSeller.paymentEmail ? this.retailSeller.paymentEmail : '',
        paymentCardNumber: '',
        paymentExpirationDate: this.retailSeller.paymentExpirationDate ? this.retailSeller.paymentExpirationDate : '',
        paymentCVV: this.retailSeller.paymentCVV ? this.retailSeller.paymentCVV : '',
      });
      this.paymentCardNumberEncrypted=this.retailSeller.paymentCardNumber ? this.retailSeller.paymentCardNumber : '';
      if(this.paymentCardNumberEncrypted.length==16){
        let paymentCardNumberAux= '****'+this.paymentCardNumberEncrypted.substring(12,16);
        this.paymentCardNumberEncrypted=paymentCardNumberAux;
      }
      else{
        this.paymentCardNumberEncrypted= ''
      }
    })
  }

  openDialogUpdate():void{
    if(this.userFormGroup.valid){
      const dialogRef=this.dialog.open(RetailSellerPaymentDialogUpdateComponent,{
      });

      dialogRef.afterClosed().subscribe(result =>{
        if(result==true){
          this.retailSeller.paymentName=this.userFormGroup.get('paymentName')?.value;
          this.retailSeller.paymentPhone=String(this.userFormGroup.get('paymentPhone')?.value);
          this.retailSeller.paymentEmail=this.userFormGroup.get('paymentEmail')?.value;
          this.retailSeller.paymentCardNumber=String(this.userFormGroup.get('paymentCardNumber')?.value);
          this.retailSeller.paymentExpirationDate=this.userFormGroup.get('paymentExpirationDate')?.value;
          this.retailSeller.paymentCVV=String(this.userFormGroup.get('paymentCVV')?.value);
          console.log(this.retailSeller);
          this.retailSellersService.update(this.id,this.retailSeller).subscribe(response=>{
            this.toastr.success('Information Submitted','Success');
          })
        }
      });
    }
    else{
      this.toastr.error('Fix the errors first','Error')
    }

  }

}
