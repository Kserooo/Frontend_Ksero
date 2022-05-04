import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";


@Component({
  selector: 'app-wholesaler-products-dialog-update',
  templateUrl: './wholesaler-products-dialog-update.component.html',
  styleUrls: ['./wholesaler-products-dialog-update.component.css']
})



export class WholesalerProductsDialogUpdateComponent{

  constructor(
    public dialogRef: MatDialogRef<WholesalerProductsDialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
