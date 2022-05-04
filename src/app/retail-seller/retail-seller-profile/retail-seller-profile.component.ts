import { Component, OnInit } from '@angular/core';
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {ActivatedRoute} from "@angular/router";
import {RetailSeller} from "../../models/retail-seller";
import {MatDialog} from "@angular/material/dialog";
import {
  RetailSellerProfileDialogUpdateComponent
} from "./retail-seller-profile-dialog-update/retail-seller-profile-dialog-update.component";

@Component({
  selector: 'app-retail-seller-profile',
  templateUrl: './retail-seller-profile.component.html',
  styleUrls: ['./retail-seller-profile.component.css']
})
export class RetailSellerProfileComponent implements OnInit {
  id:string;
  retailSellerActual: RetailSeller;

  constructor(private retailSellersService: RetailSellersService, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.retailSellerActual={} as RetailSeller;
  }

  ngOnInit(): void {
    this.getActualData();
  }

  getActualData():void{
    this.retailSellersService.getById(this.id).subscribe((response:any)=>{
      this.retailSellerActual=response;
    })
  }

  openDialog(data: RetailSeller): void {
    const dialogRef=this.dialog.open(RetailSellerProfileDialogUpdateComponent,{
      data:{...data}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=undefined){
        let profileReceived = result;

        this.retailSellersService.update(this.id,profileReceived).subscribe(response=>{
          this.getActualData();
        })
      }
    })
  }
}
