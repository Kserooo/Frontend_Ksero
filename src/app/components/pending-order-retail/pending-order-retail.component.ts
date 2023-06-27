import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-pending-order-retail',
  templateUrl: './pending-order-retail.component.html',
  styleUrls: ['./pending-order-retail.component.css']
})
export class PendingOrderRetailComponent implements OnInit {

  @Input() productsData: Product[] = [];
  @Input() ordersData: Order[] = [];
  @Input() index: number = 0;
  @Input() product!: Product;

  @Output() timeToUpdate: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

}
