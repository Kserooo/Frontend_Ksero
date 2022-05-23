import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products/products.service";
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
  selector: 'app-wholesaler-products',
  templateUrl: './wholesaler-products.component.html',
  styleUrls: ['./wholesaler-products.component.css']
})
export class WholesalerProductsComponent implements OnInit {
  id: string;
  productsData: Product[];

  constructor(private route: ActivatedRoute, private productsService: ProductsService,
              private dialog: MatDialog, private toastr:ToastrService) {
    this.productsData=[] as Product[];
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.updateProductsData();
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
}
