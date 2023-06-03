import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-wholesale-profile-view-dialog-update',
  templateUrl: './wholesale-profile-view-dialog-update.component.html',
  styleUrls: ['./wholesale-profile-view-dialog-update.component.css']
})
export class WholesaleProfileViewDialogUpdateComponent {

  constructor(
    public dialogRef: MatDialogRef<WholesaleProfileViewDialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
