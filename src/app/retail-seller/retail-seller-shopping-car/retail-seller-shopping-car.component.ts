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
  shoppingCarOrder: ShoppingCarOrder[];
  constructor(private route: ActivatedRoute,
              private productsService: ProductsService, private wholesalerOrdersService: WholesalerOrdersService,
              private senderService: SenderService, private dialog: MatDialog, private toastr: ToastrService) {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.orderActual={} as Order;
    this.shoppingCarOrder= [] as ShoppingCarOrder[];
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
    this.shoppingCarOrder = this.senderService.shoppingCarOrders;
    for(let order of this.senderService.shoppingCarOrders){
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
      const dialogRef=this.dialog.open(RetailSellerShoppingCarDialogSubmitComponent,{
        data:this.sumProducts
      });

      dialogRef.afterClosed().subscribe((result :any) =>{
        if(result!=undefined){
          let i=0;
          for(let product of this.productsData){
            this.orderActual.id=0;
            this.orderActual.retailSellerId=Number(this.id);
            this.orderActual.productId=product.id;
            this.orderActual.quantity=this.shoppingCarOrder[i].quantity;
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
