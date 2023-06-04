import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../services/products/products.service";
import {MatDialog} from "@angular/material/dialog";
import {
  WholesalerProductsDialogAddComponent
} from "./wholesaler-products-dialog-add/wholesaler-products-dialog-add.component";
import {
  WholesalerProductsDialogUpdateComponent
} from "./wholesaler-products-dialog-update/wholesaler-products-dialog-update.component";
import {
  WholesalerProductsDialogDeleteComponent
} from "./wholesaler-products-dialog-delete/wholesaler-products-dialog-delete.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wholesaler-products-view',
  templateUrl: './wholesaler-products-view.component.html',
  styleUrls: ['./wholesaler-products-view.component.css']
})
export class WholesalerProductViewComponent implements OnInit {

  priceSelected: number;
  id: string;
  productsData: Product[];

  //Options
  companyOptions: String[];
  typeOptions: String[];

  constructor(private route: ActivatedRoute, private productsService: ProductsService,
              private dialog: MatDialog, private toastr:ToastrService) {
    this.productsData=[] as Product[];
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.priceSelected = 0;
    this.companyOptions = ["Gloria", "Nestle", "ALICORP", "Coca Cola"];
    this.typeOptions = ["Lacteos", "Fideos", "Bebidas"];
  }

  formatLabel(value: number): string {
    this.priceSelected = value;
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  ngOnInit(): void {
    this.updateProductsData();
  }

  onSliderChange(event: any): void {
    console.log(event.value);
  }

  openDialogAdd(): void{
    let productModel: Product;
    productModel={} as Product;
    productModel.id=0;
    productModel.wholesalerId=Number(this.id);
    const dialogRef=this.dialog.open(WholesalerProductsDialogAddComponent,{
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        productModel.name = result.name;
        productModel.description = result.description;
        productModel.price = result.price;
        this.productsService.create(productModel).subscribe((response:any)=>{
          this.updateProductsData();
          this.toastr.success('Product added','Success');
        });

      }
    });
  }

  openDialogDelete(data: Product): void{
    const dialogRef=this.dialog.open(WholesalerProductsDialogDeleteComponent,{
      data:data
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        let actualProduct = result;
        this.productsService.delete(actualProduct.id).subscribe(()=>{
          this.updateProductsData();
          this.toastr.success('Product deleted', 'Success');
        })

      }
    });
  }

  // Update
  updateProductsData(){
    this.productsService.getByWholesalerId(this.id).subscribe((response:any)=>{
      this.productsData=response;
    });
  }

  openDialogUpdate(data: Product): void{
    const dialogRef=this.dialog.open(WholesalerProductsDialogUpdateComponent,{
      data:{...data}
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        data.name = result.name;
        data.description = result.description;
        data.price = result.price;

        this.productsService.update(data.id,data).subscribe(response=>{
          this.updateProductsData();
          this.toastr.success('Product Edited','Success');
          console.log("Updated");
        })
      }
    });
  }

  // Delete
}
