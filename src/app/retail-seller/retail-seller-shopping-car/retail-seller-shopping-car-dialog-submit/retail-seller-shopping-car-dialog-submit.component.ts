import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-retail-seller-shopping-car-dialog-submit',
  templateUrl: './retail-seller-shopping-car-dialog-submit.component.html',
})



export class RetailSellerShoppingCarDialogSubmitComponent {

  constructor(
    public dialogRef: MatDialogRef<RetailSellerShoppingCarDialogSubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

