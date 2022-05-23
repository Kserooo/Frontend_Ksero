import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-retail-seller-products-dialog',
  templateUrl: './retail-seller-products-dialog.component.html',
})



export class RetailSellerProductsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RetailSellerProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, quantity: number },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

