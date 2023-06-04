import {Component} from "@angular/core";
import { MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-wholesaler-products-dialog-add',
  styleUrls: ["./wholesaler-products-dialog-add.component.css"],
  templateUrl: './wholesaler-products-dialog-add.component.html',
})



export class WholesalerProductsDialogAddComponent {

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    photoImageUrl: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<WholesalerProductsDialogAddComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
