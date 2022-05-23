import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-wholesaler-profile-dialog-update',
  templateUrl: './wholesaler-profile-dialog-update.component.html',
})



export class WholesalerProfileDialogUpdateComponent {

  constructor(
    public dialogRef: MatDialogRef<WholesalerProfileDialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

