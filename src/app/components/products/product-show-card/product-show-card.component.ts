// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Product } from '../../../models/product';
import { MatDialog } from '@angular/material/dialog';

import { ProductsService } from 'src/app/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { WholesalerProductsDialogDeleteComponent } from 'src/app/pages/wholesaler/wholesaler-products-view/wholesaler-products-dialog-delete/wholesaler-products-dialog-delete.component';
import { WholesalerProductsDialogUpdateComponent } from 'src/app/pages/wholesaler/wholesaler-products-view/wholesaler-products-dialog-update/wholesaler-products-dialog-update.component';
import { ImageConverterService } from 'src/app/utils/image-converter.service';

@Component({
  selector: 'app-product-show-card',
  templateUrl: './product-show-card.component.html',
  styleUrls: ['./product-show-card.component.css'],
})
export class ProductShowCardComponent implements OnInit {
  id: string;
  // Inputs
  @Input() product: Product | any;

  // Output
  @Output() timeToUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private productsService: ProductsService,
    private toastr: ToastrService,
    private imageConverter: ImageConverterService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {}

  updateProductsData() {
    this.productsService
      .getByWholesalerId(this.id)
      .subscribe((response: any) => {
        this.timeToUpdate.emit();
      });
  }

  // Update
  openDialogUpdate(data: Product): void {
    console.log(data);
    const dialogRef = this.dialog.open(
      WholesalerProductsDialogUpdateComponent,
      {
        data: { ...data },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        console.log('image!!!!', result.image);
        data.name = result.name;
        data.description = result.description;
        data.price = result.price;
        if(result.image)
          data.image = result.image;

        console.log("Data!!", data);
        this.productsService.update(data.id, data).subscribe((response) => {
          this.timeToUpdate.emit();
          console.log(response);
          this.toastr.success('Product Edited', 'Success');
          console.log('Updated');
        });
      }
    });
  }

  // Delete
  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(
      WholesalerProductsDialogDeleteComponent,
      {
        data: id,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.productsService.delete(id).subscribe(() => {
          this.updateProductsData();
          this.toastr.success('Product Deleted', 'Success');
        });
      }
    });
  }
}
