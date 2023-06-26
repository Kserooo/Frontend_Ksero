import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-buy-product-card',
  templateUrl: './buy-product-card.component.html',
  styleUrls: ['./buy-product-card.component.css'],
})
export class BuyProductCardComponent implements OnInit {
  @Input() product: Product | any;

  value: number = 0;

  constructor() {}



  ngOnInit(): void {}
}
