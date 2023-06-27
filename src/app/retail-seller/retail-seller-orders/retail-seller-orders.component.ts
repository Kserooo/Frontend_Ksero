import { Component, OnInit } from '@angular/core';
import { RetailSellerOrdersService } from '../../services/retail-seller-orders/retail-seller-orders.service';
import { Order } from '../../models/order';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WholesalerOrdersService } from '../../services/wholesaler-orders/wholesaler-orders.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';
import { DataTransferService } from 'src/app/utils/data-transfer.service';

@Component({
  selector: 'app-retail-seller-orders',
  templateUrl: './retail-seller-orders.component.html',
  styleUrls: ['./retail-seller-orders.component.css'],
})
export class RetailSellerOrdersComponent implements OnInit {
  id: string;
  acceptedOrders: Order[];
  pendingOrders: Order[];
  searchKey: string;
  productsAccepted: Product[];
  productsPending: Product[];
  constructor(
    private retailSellerOrdersService: RetailSellerOrdersService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private wholesalerOrdersService: WholesalerOrdersService,
    private productsService: ProductsService,
    private dataTransferService: DataTransferService
  ) {
    if(this.dataTransferService.userId === "") {
      this.dataTransferService.userId = localStorage.getItem('retailsellerId') as string;
    }
    this.id = this.dataTransferService.userId;
    this.acceptedOrders = [] as Order[];
    this.pendingOrders = [] as Order[];
    this.productsAccepted = [] as Product[];
    this.productsPending = [] as Product[];
    this.searchKey = '';
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  ngAfterViewInit() {}

  retrieveData() {
    this.acceptedOrders = [];
    this.pendingOrders = [];
    this.retailSellerOrdersService
      .getByRetailSellerId(Number(this.id))
      .subscribe((response: any) => {
        this.acceptedOrders = response;
        for (let order of response) {
          this.productsService
            .getById(order.productId)
            .subscribe((response2: any) => {
              this.productsAccepted.push(response2);
            });
        }
      });
    this.wholesalerOrdersService
      .getByRetailSellerId(Number(this.id))
      .subscribe((response: any) => {
        this.pendingOrders = response;
        for (let order of response) {
          this.productsService
            .getById(order.productId)
            .subscribe((response2: any) => {
              this.productsPending.push(response2);
            });
        }
      });
  }
}
