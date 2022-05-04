import {Component, OnInit, ViewChild} from '@angular/core';

import {RetailSeller} from "../../models/retail-seller";
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {Product} from "../../models/product";
import {ProductsService} from "../../services/products/products.service";
import {Order} from "../../models/order";
import {OrdersService} from "../../services/orders/orders.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-wholesaler-orders',
  templateUrl: './wholesaler-orders.component.html',
  styleUrls: ['./wholesaler-orders.component.css']
})

export class WholesalerOrdersComponent implements OnInit {
  id: String;

  retailSellerData: RetailSeller[];
  productsData: Product[];
  ordersData: Order[];

  constructor(private retailSellerService: RetailSellersService, private productsService: ProductsService,
              private ordersService:OrdersService, private route: ActivatedRoute) {
    this.retailSellerData = [] as RetailSeller[];
    this.productsData = [] as Product[];
    this.ordersData = [] as Order[];
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.ordersService.getAll().subscribe((response:any)=>{
      this.ordersData=response;
      for(let order of this.ordersData){
        this.productsService.getById(order.productId).subscribe((response2:any)=>{
          if(response2.wholesalerId==this.id){
            this.productsData.push(response2);
            this.retailSellerService.getById(order.retailSellerId).subscribe((response3):any=>{
              this.retailSellerData.push(response3);
            })
          }
        })
      }
    })
  }


}
