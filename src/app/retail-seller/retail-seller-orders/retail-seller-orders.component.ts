import { Component, OnInit } from '@angular/core';
import {RetailSellerOrdersService} from "../../services/retail-seller-orders/retail-seller-orders.service";
import {Order} from "../../models/order";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {WholesalerOrdersService} from "../../services/wholesaler-orders/wholesaler-orders.service";

@Component({
  selector: 'app-retail-seller-orders',
  templateUrl: './retail-seller-orders.component.html',
  styleUrls: ['./retail-seller-orders.component.css']
})
export class RetailSellerOrdersComponent implements OnInit {
  id: string;
  acceptedOrders: Order[];
  pendingOrders: Order[];

  constructor(private retailSellerOrdersService: RetailSellerOrdersService, private route: ActivatedRoute,
              private toastr: ToastrService, private wholesalerOrdersService:WholesalerOrdersService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.acceptedOrders = [] as Order[];
    this.pendingOrders = [] as Order[];
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData(){
    this.acceptedOrders = [];
    this.pendingOrders = [];
    this.retailSellerOrdersService.getByRetailSellerId(Number(this.id)).subscribe((response: any)=>{
      this.acceptedOrders = response;
    })
    this.wholesalerOrdersService.getByRetailSellerId(Number(this.id)).subscribe((response: any)=>{
      this.pendingOrders = response;
    })
  }

}
