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
import {SenderService} from "../../sender.service";
import {ToastrService} from "ngx-toastr";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-retail-seller-products',
  templateUrl: './retail-seller-products.component.html',
  styleUrls: ['./retail-seller-products.component.css']
})
export class RetailSellerProductsComponent implements OnInit ,AfterViewInit {
  sliderValue: number[];
  searchKey: string;
  id: string;
  productsData: Product[];
  wholesalersData: Wholesaler[];
  retailSellerActual: RetailSeller;
  isSliderToggleChecked: boolean[];
  productsQuantity: number[];

  constructor(private breakPointObserver: BreakpointObserver, private productsService: ProductsService,
              private wholesalersService:WholesalersService, private dialog: MatDialog,
              private retailSellersService: RetailSellersService, private route: ActivatedRoute,
              public senderService: SenderService, private toastr: ToastrService,
              ) {
    this.searchKey = '';
    this.sliderValue = [] as number [];
    this.productsData = [] as Product[];
    this.wholesalersData = [] as Wholesaler[];
    this.id= JSON.parse(localStorage.getItem("user")!).id;
    this.retailSellerActual = {} as RetailSeller;
    this.isSliderToggleChecked = [] as boolean[];
    this.productsQuantity = [] as number[];
  }

  ngOnInit() {
    // this.productsService.getAll().subscribe((response:any)=>{
    //   this.productsData=response;
    //   for(let product of this.productsData){
    //     this.sliderValue.push(1);
    //     this.isSliderToggleChecked.push(true);
    //     if(this.senderService.shoppingCarOrders.find(x=>x.productId==product.id)){
    //       this.productsQuantity.push(this.senderService.shoppingCarOrders.find(x=>x.productId==product.id)!.quantity);
    //     }
    //     else{
    //       this.productsQuantity.push(0);
    //     }
    //     console.log(product.wholesalerId);
    //     this.wholesalersService.getById(product.wholesalerId).subscribe((response2: any)=>{
    //       this.wholesalersData.push(response2);
    //     })
    //   }
    // });
    this.productsService.getAll().subscribe((res : any) => {
      console.log(res);
      this.productsData = res as Product[];
    });

  }

  ngAfterViewInit() {}



  openDialogAddToCar(data: Product, quantity: number, index: number): void{

    const dialogRef=this.dialog.open(RetailSellerProductsDialogComponent,{
      data: {
        product: data,
        quantity: quantity
      }
    });

    dialogRef.afterClosed().subscribe((result: any) =>{
      if(result!=undefined){
        if(this.senderService.shoppingCarOrders.find(x=>x.productId==result.product.id)){
          this.productsQuantity[index]=this.senderService.shoppingCarOrders.find(x=>x.productId==result.product.id)!.quantity+=result.quantity;

        }
        else{
          this.senderService.shoppingCarOrders.push({productId:result.product.id, quantity:result.quantity});
          this.productsQuantity[index]=result.quantity;
        }

        this.toastr.success('Added to the car', 'Success');
      }
    });
  }

  openDialogDeleteOfCar(data: Product, quantity: number, index: number): void{

    const dialogRef=this.dialog.open(RetailSellerProductsDialogDeleteComponent,{
      data: {
        product: data,
        quantity: quantity
      }
    });

    dialogRef.afterClosed().subscribe((result: any) =>{
      if(result!=undefined) {
        if(this.senderService.shoppingCarOrders.find(x=>x.productId==result.product.id)!.quantity==quantity){
          this.senderService.shoppingCarOrders = this.senderService.shoppingCarOrders.filter(x=>x.productId!=result.product.id);
          this.productsQuantity[index]=0;
        }
        else{
          this.senderService.shoppingCarOrders.find(x=>x.productId==result.product.id)!.quantity-=quantity;
          this.productsQuantity[index]-=quantity;
        }
        //this.productsData.find(x=>x.id==result.id)!.canAddToCar=true;
        this.toastr.success('Deleted from the car', 'Success');
      }
    });
  }
  slideToggleChange(event: MatSlideToggleChange, product: Product, index: number){
    if(!event.checked){
      if(this.senderService.shoppingCarOrders.find(x=> x.productId == product.id)){
        this.sliderValue[index] = this.senderService.shoppingCarOrders.find(x=> x.productId == product.id)!.quantity;
        console.log(this.sliderValue[index])
      }
      else{
        this.sliderValue[index] = 0;
      }
    }
    else{
      if(this.sliderValue[index] == 0){
        this.sliderValue[index] = 1;
      }
    }
  }
}
