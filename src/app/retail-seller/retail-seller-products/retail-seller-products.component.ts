import {AfterViewInit, Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver} from "@angular/cdk/layout";
import {Product} from "../../models/product";
import {ProductsService} from "../../services/products/products.service";
import {WholesalersService} from "../../services/wholesalers/wholesalers.service";
import {Wholesaler} from "../../models/wholesaler";
import {MatDialog,MatDialogConfig} from "@angular/material/dialog";
import {
  RetailSellerProductsDialogComponent
} from "./retail-seller-products-dialog/retail-seller-products-dialog.component";
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {ActivatedRoute} from "@angular/router";
import {RetailSeller} from "../../models/retail-seller";
import {
  RetailSellerProductsDialogDeleteComponent
} from "./retail-seller-products-dialog-delete/retail-seller-products-dialog-delete.component";

@Component({
  selector: 'app-retail-seller-products',
  templateUrl: './retail-seller-products.component.html',
  styleUrls: ['./retail-seller-products.component.css']
})
export class RetailSellerProductsComponent implements OnInit ,AfterViewInit {
  id: string;
  productsData: Product[];
  wholesalersData: Wholesaler[];
  retailSellerData: RetailSeller[];
  retailSellerActual: RetailSeller;

  constructor(private breakPointObserver: BreakpointObserver, private productsService: ProductsService,
              private wholesalersService:WholesalersService, private dialog: MatDialog,
              private retailSellersService: RetailSellersService, private route:ActivatedRoute
              ) {
    this.productsData=[] as Product[];
    this.wholesalersData=[] as Wholesaler[];
    this.retailSellerData = [] as RetailSeller[];
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.retailSellerActual= {} as RetailSeller;
  }

  ngOnInit(): void {
    this.productsService.getAll().subscribe((response:any)=>{
      this.productsData=response;
      for(let product of this.productsData){
        product.canAddToCar=true;
      }
      console.log(response);
    });
    this.wholesalersService.getAll().subscribe((response:any)=>{
      this.wholesalersData=response;
      console.log(response);
    });
    this.retailSellersService.getAll().subscribe((response:any)=>{
      console.log(response);
      this.retailSellerData = response;

      this.retailSellersService.getById(this.id).subscribe((retailResponse)=>{
        this.retailSellerActual=retailResponse;
        for(let order of this.retailSellerActual.order){
          if(this.productsData.find(x=>x.id==order)!=undefined){
            this.productsData.find(x=> x.id==order)!.canAddToCar=false;
          }
          else{
            //Borrar order
          }
        }
      })
    });

  }
  ngAfterViewInit() {

  }



  openDialog(data: Product): void{

    const dialogRef=this.dialog.open(RetailSellerProductsDialogComponent,{
      data:data
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        let actualProduct = result;
        this.productsData.find(x=> x.id==actualProduct.id)!.canAddToCar=false;
        let retailSellerAux= this.retailSellerActual;

        retailSellerAux.order.push(actualProduct.id);
        this.retailSellersService.update(this.id,retailSellerAux).subscribe(response=>{
          console.log("Order Added");
        });
      }
    });
  }

  openDialogDelete(data:Product): void{

    const dialogRef=this.dialog.open(RetailSellerProductsDialogDeleteComponent,{
      data:data
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        let actualProduct = result;
        this.productsData.find(x=> x.id==actualProduct.id)!.canAddToCar=true;
        let retailSellerAux= this.retailSellerActual;
        console.log(actualProduct.id);
        retailSellerAux.order=retailSellerAux.order.filter(data=>data!=actualProduct.id);
        this.retailSellersService.update(this.id,retailSellerAux).subscribe(response=>{
          console.log("Order Deleted");
        });
      }
    });
  }
}
