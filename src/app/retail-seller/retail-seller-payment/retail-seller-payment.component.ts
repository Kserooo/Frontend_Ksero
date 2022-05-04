import { Component, OnInit } from '@angular/core';
import {RetailSeller} from "../../models/retail-seller";
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {ActivatedRoute} from "@angular/router";
import {
  WholesalerProductsDialogUpdateComponent
} from "../../wholesaler/wholesaler-products/wholesaler-products-dialog-update/wholesaler-products-dialog-update.component";
import {
  RetailSellerPaymentDialogUpdateComponent
} from "./retail-seller-payment-dialog-update/retail-seller-payment-dialog-update.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-retail-seller-payment',
  templateUrl: './retail-seller-payment.component.html',
  styleUrls: ['./retail-seller-payment.component.css']
})
export class RetailSellerPaymentComponent implements OnInit {
  id: string;
  retailSeller: RetailSeller;
  constructor(private retailSellersService: RetailSellersService, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.retailSeller= {} as RetailSeller;
    this.id=route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.retailSellersService.getById(this.id).subscribe((response:any)=>{
      this.retailSeller=response;

    })
  }

  openDialogUpdate(data: RetailSeller):void{
    const dialogRef=this.dialog.open(RetailSellerPaymentDialogUpdateComponent,{
      data:data
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        this.retailSellersService.update(this.id,result).subscribe(response=>{

        })
      }
    });
  }

}
