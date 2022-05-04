import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-retail-seller-profile-dialog-update',
  templateUrl: './retail-seller-profile-dialog-update.component.html',
})



export class RetailSellerProfileDialogUpdateComponent {

  constructor(
    public dialogRef: MatDialogRef<RetailSellerProfileDialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

