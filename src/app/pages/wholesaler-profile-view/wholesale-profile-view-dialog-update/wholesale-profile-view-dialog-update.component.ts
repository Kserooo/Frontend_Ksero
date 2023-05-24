import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wholesale-profile-view-dialog-update',
  templateUrl: './wholesale-profile-view-dialog-update.component.html',
  styleUrls: ['./wholesale-profile-view-dialog-update.component.css']
})
export class WholesaleProfileViewDialogUpdateComponent {

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<WholesaleProfileViewDialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {
    this.productFormGroup.setValue({
      name: data.name,
      description: data.description,
      price: data.price
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
