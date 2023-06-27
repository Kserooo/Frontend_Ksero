import {Component, OnInit, ViewChild} from '@angular/core';

import {RetailSeller} from "../../models/retail-seller";
import {RetailSellersService} from "../../services/retail-sellers/retail-sellers.service";
import {Product} from "../../models/product";
import {ProductsService} from "../../services/products/products.service";
import {Order} from "../../models/order";
import {WholesalerOrdersService} from "../../services/wholesaler-orders/wholesaler-orders.service";
import {ActivatedRoute} from "@angular/router";
import {
  RetailSellerShoppingCarDialogSubmitComponent
} from "../../retail-seller/retail-seller-shopping-car/retail-seller-shopping-car-dialog-submit/retail-seller-shopping-car-dialog-submit.component";
import {MatDialog} from "@angular/material/dialog";
import {
  WholesalerOrdersDialogRejectComponent
} from "./wholesaler-orders-dialog-reject/wholesaler-orders-dialog-reject.component";
import {
  WholesalerOrdersDialogAcceptComponent
} from "./wholesaler-orders-dialog-accept/wholesaler-orders-dialog-accept.component";
import {ToastrService} from "ngx-toastr";
import {RetailSellerOrdersService} from "../../services/retail-seller-orders/retail-seller-orders.service";
import { DataTransferService } from 'src/app/utils/data-transfer.service';


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
  searchKey: string;
  acceptedOrders: Order[];
  productsAccepted: Product[];

  constructor(private retailSellerService: RetailSellersService, private productsService: ProductsService,
              private wholesalerOrdersService:WholesalerOrdersService, private route: ActivatedRoute,
              private dialog: MatDialog, private toastr: ToastrService,
              private retailSellerOrdersService: RetailSellerOrdersService,
              private dataTransferService: DataTransferService) {
    this.retailSellerData = [] as RetailSeller[];
    this.productsData = [] as Product[];
    this.ordersData = [] as Order[];
    this.productsAccepted = [] as Product[];
    this.acceptedOrders = [] as Order[];
    this.searchKey = '';
    if(this.dataTransferService.userId === "") {
      this.dataTransferService.userId = localStorage.getItem('wholesalerId') as string;
    }
    this.id = this.dataTransferService.userId;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.retrieveData();
  }
  retrieveData(): void {
    this.ordersData = [];
    this.productsData = [];
    this.retailSellerData = [];
    this.wholesalerOrdersService.getAll().subscribe((response: any) => {
      console.log("WholeSalers orders ", response);
      for (let order of response) {
        this.productsService.getById(order.productId).subscribe((response2: any) => {
          if (response2.wholesalerId == this.id) {
            this.ordersData = [...this.ordersData, order];
            this.productsData = [...this.productsData, response2];
            this.retailSellerService.getById(order.retailSellerId).subscribe((response3: any) => {
              this.retailSellerData = [...this.retailSellerData, response3];
            })
          }
        })
      }
    })
    this.retailSellerOrdersService.getAll().subscribe((response3: any) => {
      console.log("Retailseller orders: ", response3);
      for (let order1 of response3) {
        this.productsService.getById(order1.productId).subscribe((response4: any) => {
          console.log(response4.wholesalerId);
          console.log(this.dataTransferService.userId);
          console.log(this.id);
          if (response4.wholesalerId == this.id) {
            this.acceptedOrders = [...this.acceptedOrders, order1];
            this.productsAccepted = [...this.productsAccepted, response4];
          }
        })
      }
    })
  }

  openRejectDialog(index: number){
    console.log(this.productsData[index].name);
    const dialogRef=this.dialog.open(WholesalerOrdersDialogRejectComponent,{
      data: {
        quantity: this.ordersData[index].quantity,
        name: this.productsData[index].name
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result!=undefined){
        this.wholesalerOrdersService.delete(this.ordersData[index].id).subscribe(response=>{
          this.toastr.success('Order Rejected','Success');
          this.retrieveData();
        });
      }
    });

  }

  openAcceptDialog(index: number){
    console.log(index);
    const dialogRef=this.dialog.open(WholesalerOrdersDialogAcceptComponent,{
      data: {
        quantity: this.ordersData[index].quantity,
        name: this.productsData[index].name
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result!=undefined){
        this.wholesalerOrdersService.delete(this.ordersData[index].id).subscribe(response=>{
          console.log(this.ordersData[index]);
          this.ordersData = this.ordersData.filter( (order: Order) => order.id !== this.ordersData[index].id);
          this.retailSellerOrdersService.create(this.ordersData[index]).subscribe(response2=>{
            console.log(response2);
            this.acceptedOrders = [...this.acceptedOrders, response2];
            this.toastr.success('Order Accepted','Success');
            this.retrieveData();
          })
        });
      }
    });

  }


}
