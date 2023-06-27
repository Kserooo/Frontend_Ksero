import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-accepted-order-retail',
  templateUrl: './accepted-order-retail.component.html',
  styleUrls: ['./accepted-order-retail.component.css']
})
export class AcceptedOrderRetailComponent implements OnInit {

  @Input() acceptedOrder!: Order;
  @Input() index: number = 0;
  @Input() productsAccepted: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
