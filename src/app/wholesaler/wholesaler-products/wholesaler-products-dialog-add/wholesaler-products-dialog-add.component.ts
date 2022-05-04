import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-wholesaler-products-dialog-add',
  templateUrl: './wholesaler-products-dialog-add.component.html',
})



export class WholesalerProductsDialogAddComponent {

  constructor(
    public dialogRef: MatDialogRef<WholesalerProductsDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
