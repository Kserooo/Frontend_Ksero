import { Component, OnInit } from '@angular/core';
import {WholesalersService} from "../../services/wholesalers/wholesalers.service";
import {ActivatedRoute} from "@angular/router";
import {Wholesaler} from "../../models/wholesaler";
import {MatDialog} from "@angular/material/dialog";
import {
  WholesalerProfileDialogUpdateComponent
} from "./wholesaler-profile-dialog-update/wholesaler-profile-dialog-update.component";

@Component({
  selector: 'app-wholesaler-profile',
  templateUrl: './wholesaler-profile.component.html',
  styleUrls: ['./wholesaler-profile.component.css']
})
export class WholesalerProfileComponent implements OnInit {
  id:string;
  wholesalerActual: Wholesaler;

  constructor(private wholesalersService: WholesalersService, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.wholesalerActual={} as Wholesaler;
  }

  ngOnInit(): void {
    this.getActualData();
  }

  getActualData():void{
    this.wholesalersService.getById(this.id).subscribe((response:any)=>{
      this.wholesalerActual=response;
    })
  }

  openDialog(data: Wholesaler): void {
    const dialogRef=this.dialog.open(WholesalerProfileDialogUpdateComponent,{
      data:{...data}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=undefined){
        let wholesalerReceived = result;

        this.wholesalersService.update(this.id,wholesalerReceived).subscribe(response=>{
          this.getActualData();
        })
      }
    })
  }
}
