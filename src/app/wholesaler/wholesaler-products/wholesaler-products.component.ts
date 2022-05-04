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

@Component({
  selector: 'app-wholesaler-products',
  templateUrl: './wholesaler-products.component.html',
  styleUrls: ['./wholesaler-products.component.css']
})
export class WholesalerProductsComponent implements OnInit {
  id: string;
  productsData: Product[];

  constructor(private route: ActivatedRoute, private productsService: ProductsService,
              private dialog: MatDialog) {
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
      data: productModel
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        this.productsService.create(result).subscribe((response:any)=>{
          this.updateProductsData();
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
        let actualProduct = result;

        this.productsService.update(actualProduct.id,result).subscribe(response=>{
          this.updateProductsData();
          console.log("Updated");
        })
      }
    });
  }
}
