import { Component, OnInit } from '@angular/core';
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {ActivatedRoute} from "@angular/router";
import {RetailSeller} from "../../models/retail-seller";
import {Order} from "../../models/order";
import {Product} from "../../models/product";
import {ProductsService} from "../../services/products/products.service";
import {OrdersService} from "../../services/orders/orders.service";

@Component({
  selector: 'app-retail-seller-shopping-car',
  templateUrl: './retail-seller-shopping-car.component.html',
  styleUrls: ['./retail-seller-shopping-car.component.css']
})
export class RetailSellerShoppingCarComponent implements OnInit {
  id: string;
  retailSellerActual: RetailSeller;
  orderActual: Order;
  productsData: Product[];
  sumProducts: Number;
  constructor(private retailSellersService: RetailSellersService, private route: ActivatedRoute,
              private productsService: ProductsService, private ordersService: OrdersService) {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.retailSellerActual= {} as RetailSeller;
    this.orderActual={} as Order;
    this.productsData=[] as Product[];
    this.sumProducts=0;
  }

  ngOnInit(): void {
    this.retailSellersService.getById(this.id).subscribe((response:any)=>{
      this.retailSellerActual=response;
      for(let Order of this.retailSellerActual.order){
        this.productsService.getById(Order).subscribe((response2:any)=>{
          this.productsData.push(response2);
          this.sumProducts+=response2.price;
        })
      }
    })
  }

  SubmitOrder(): void {
    for(let product of this.productsData){
      this.orderActual.id=0;
      this.orderActual.retailSellerId=Number(this.id);
      this.orderActual.productId=product.id;
      this.ordersService.create(this.orderActual).subscribe();
    }
  }

}
