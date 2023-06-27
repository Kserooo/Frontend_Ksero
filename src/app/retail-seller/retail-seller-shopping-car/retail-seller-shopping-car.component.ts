import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RetailSeller} from "../../models/retail-seller";
import {Order} from "../../models/order";
import {Product} from "../../models/product";
import {ProductsService} from "../../services/products/products.service";
import {WholesalerOrdersService} from "../../services/wholesaler-orders/wholesaler-orders.service";
import {SenderService} from "../../sender.service";
import {MatDialog} from "@angular/material/dialog";
import {
  RetailSellerShoppingCarDialogSubmitComponent
} from "./retail-seller-shopping-car-dialog-submit/retail-seller-shopping-car-dialog-submit.component";
import { ToastrService } from "ngx-toastr";
import {ShoppingCarOrder} from "../../models/shopping-car-order";
import { PurchaseData } from './model/purchase-data.model';
import { DataTransferService } from 'src/app/utils/data-transfer.service';

@Component({
  selector: 'app-retail-seller-shopping-car',
  templateUrl: './retail-seller-shopping-car.component.html',
  styleUrls: ['./retail-seller-shopping-car.component.css']
})
export class RetailSellerShoppingCarComponent implements OnInit {
  id: string;
  orderActual: Order;
  productsData: Product[];
  counter: number;
  sumProducts: number;
  shopingCart: ShoppingCarOrder[];
  constructor(private route: ActivatedRoute,
              private productsService: ProductsService, private wholesalerOrdersService: WholesalerOrdersService,
              private senderService: SenderService, private dialog: MatDialog, private toastr: ToastrService,
              private dataTransferService: DataTransferService) {
    if(this.dataTransferService.userId === "") {
      this.dataTransferService.userId = localStorage.getItem('retailsellerId') as string;
    }
    this.id= this.dataTransferService.userId;
    this.orderActual={} as Order;
    this.shopingCart= [] as ShoppingCarOrder[];
    this.productsData=[] as Product[];
    this.sumProducts=0;
    this.counter = 0;
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData(){
    this.productsData = [];
    this.sumProducts = 0;
    this.shopingCart = JSON.parse(localStorage.getItem("shopingCart")!) as ShoppingCarOrder[];
    for(let order of this.shopingCart){
      this.productsService.getById(order.productId).subscribe((response: any)=>{
        this.productsData.push(response);
        console.log(response);
        this.sumProducts+=response.price*order.quantity;
        this.counter++;
      })
    }
  }

  deleteProduct(id: number){
    //this.senderService.shoppingCarOrders = this.senderService.shoppingCarOrders.filter((order: any) => order.productId !== id);
    //this.retrieveData();
  }

  openDialogSubmit(): void {
    if(this.productsData.length>0){
      const purchaseData: PurchaseData = {
        totalAmount: this.sumProducts,
        productsToPurchase: [...this.productsData]
      }
      const dialogRef=this.dialog.open(RetailSellerShoppingCarDialogSubmitComponent,{
        data: purchaseData
      });

      dialogRef.afterClosed().subscribe((result : PurchaseData) =>{
        console.log(result);
        if(result!=undefined){
          let i=0;
          for(let product of this.productsData){
            this.orderActual.id=0;
            this.orderActual.retailSellerId=Number(this.id);
            this.orderActual.productId=product.id;
            this.orderActual.quantity=this.shopingCart[i].quantity;
            this.orderActual.operationCode=result.operationCode;
            this.wholesalerOrdersService.create(this.orderActual).subscribe((response: any)=>{
              this.toastr.success('Order Submitted','Success');
            });
            i++;
          }
          this.senderService.shoppingCarOrders = [];
          this.retrieveData();
        }
      })
    }
    else{
      this.toastr.error('Please first add some products to the car', 'Error');
    }

  }

}
