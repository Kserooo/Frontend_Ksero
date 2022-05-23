import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-retail-seller-products-dialog-delete',
  templateUrl: './retail-seller-products-dialog-delete.component.html',
})



export class RetailSellerProductsDialogDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<RetailSellerProductsDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, quantity: number },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

