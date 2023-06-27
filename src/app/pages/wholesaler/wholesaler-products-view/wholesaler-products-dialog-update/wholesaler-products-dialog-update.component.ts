import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../../models/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ImageConverterService } from "src/app/utils/image-converter.service";


@Component({
  selector: 'app-wholesaler-products-dialog-update',
  templateUrl: './wholesaler-products-dialog-update.component.html',
  styleUrls: ['./wholesaler-products-dialog-update.component.css']
})



export class WholesalerProductsDialogUpdateComponent{

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<WholesalerProductsDialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private imageConverter: ImageConverterService
  ) {
    this.productFormGroup.setValue({
      name: data.name,
      description: data.description,
      price: data.price,
      image: ""
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onFileSelected(event: any) {
    console.log("File selected!");
    console.log(event.target.files[0]);
    var base64Image = await this.imageConverter.fileToBase64(event.target);
    this.productFormGroup.get("image")?.setValue(base64Image);
  }
}
