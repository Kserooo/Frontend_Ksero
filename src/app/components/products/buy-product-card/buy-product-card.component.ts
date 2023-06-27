import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

// Service

// Custom Components
import { RetailSellerProductsDialogComponent } from 'src/app/retail-seller/retail-seller-products/retail-seller-products-dialog/retail-seller-products-dialog.component';
import { RetailSellerProductsDialogDeleteComponent } from 'src/app/retail-seller/retail-seller-products/retail-seller-products-dialog-delete/retail-seller-products-dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { SenderService } from 'src/app/sender.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCarOrder } from 'src/app/models/shopping-car-order';

@Component({
  selector: 'app-buy-product-card',
  templateUrl: './buy-product-card.component.html',
  styleUrls: ['./buy-product-card.component.css'],
})
export class BuyProductCardComponent implements OnInit {
  @Input() product!: Product;

  @Output() addToCartEvent = new EventEmitter();

  value: number = 0;

  // Product Arrays
  productArray!: ShoppingCarOrder[];

  constructor(
    private dialog: MatDialog,
    private senderService: SenderService,
    private toastr: ToastrService
  ) {
  }

  openDialogAddToCart(data: Product, quantity: number): void {
    const dialogRef = this.dialog.open(RetailSellerProductsDialogComponent, {
      data: {
        product: data,
        quantity: quantity,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        var shopingCart = JSON.parse(localStorage.getItem("shopingCart")!) as ShoppingCarOrder[];
        var foundObject = shopingCart.find(order => order.productId == this.product.id);
        if(foundObject) {
          foundObject.quantity = this.value;
        } else {
          shopingCart.push({quantity: this.value, productId: this.product.id });
        }
        localStorage.setItem("shopingCart", JSON.stringify(shopingCart));
        this.toastr.success('Added to the car', 'Success');
      }
    });
  }

  openDialogDeleteOfCar(data: Product, quantity: number, index: number): void {
    const dialogRef = this.dialog.open(
      RetailSellerProductsDialogDeleteComponent,
      {
        data: {
          product: data,
          quantity: quantity,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        if (
          this.senderService.shoppingCarOrders.find(
            (x) => x.productId == result.product.id
          )!.quantity == quantity
        ) {
          this.senderService.shoppingCarOrders =
            this.senderService.shoppingCarOrders.filter(
              (x) => x.productId != result.product.id
            );
          // this.productsQuantity[index]=0;
        } else {
          this.senderService.shoppingCarOrders.find(
            (x) => x.productId == result.product.id
          )!.quantity -= quantity;
          // this.productsQuantity[index]-=quantity;
        }
        //this.productsData.find(x=>x.id==result.id)!.canAddToCar=true;
        this.toastr.success('Deleted from the car', 'Success');
      }
    });
  }

  ngOnInit(): void {
    var shopingCart = JSON.parse(localStorage.getItem("shopingCart")!) as ShoppingCarOrder[];
    console.log(this.product.id);

    var foundOrder = shopingCart.find(order => order.productId == this.product.id);
    if (foundOrder) {
      this.value = foundOrder?.quantity!;
    } else {
      this.value = 0;
    }
  }
}
