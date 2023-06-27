import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-acepted-order',
  templateUrl: './acepted-order.component.html',
  styleUrls: ['./acepted-order.component.css']
})
export class AceptedOrderComponent implements OnInit {

  @Input() acceptedOrder!: Order;
  @Input() index: number = 0;
  @Input() productsAccepted: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
