import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-wholesaler-products-dialog-delete',
  templateUrl: './wholesaler-products-dialog-delete.component.html',
})



export class WholesalerProductsDialogDeleteComponent{

  constructor(
    public dialogRef: MatDialogRef<WholesalerProductsDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



}
