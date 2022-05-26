import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RetailSeller} from "../../../models/retail-seller";

@Component({
  selector: 'app-retail-seller-payment-dialog-update',
  templateUrl: './retail-seller-payment-dialog-update.component.html',
})



export class RetailSellerPaymentDialogUpdateComponent {

  constructor(
    public dialogRef: MatDialogRef<RetailSellerPaymentDialogUpdateComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

