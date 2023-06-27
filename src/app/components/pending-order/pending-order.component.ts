import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { RetailSellerOrdersService } from 'src/app/services/retail-seller-orders/retail-seller-orders.service';
import { WholesalerOrdersService } from 'src/app/services/wholesaler-orders/wholesaler-orders.service';
import { WholesalerOrdersDialogAcceptComponent } from 'src/app/wholesaler/wholesaler-orders/wholesaler-orders-dialog-accept/wholesaler-orders-dialog-accept.component';
import { WholesalerOrdersDialogRejectComponent } from 'src/app/wholesaler/wholesaler-orders/wholesaler-orders-dialog-reject/wholesaler-orders-dialog-reject.component';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css'],
})
export class PendingOrderComponent implements OnInit {
  @Input() productsData: Product[] = [];
  @Input() ordersData: Order[] = [];
  @Input() index: number = 0;
  @Input() product!: Product;

  @Output() timeToUpdate: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private wholesalerOrdersService: WholesalerOrdersService,
    private dialog: MatDialog,
    private retailSellerOrdersService: RetailSellerOrdersService
  ) {}

  ngOnInit(): void {}

  openRejectDialog(index: number) {
    console.log(this.productsData[index].name);
    const dialogRef = this.dialog.open(WholesalerOrdersDialogRejectComponent, {
      data: {
        quantity: this.ordersData[index].quantity,
        name: this.productsData[index].name,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        this.wholesalerOrdersService
          .delete(this.ordersData[index].id)
          .subscribe((response) => {
            this.toastr.success('Order Rejected', 'Success');
            this.timeToUpdate.emit();
          });
      }
    });
  }

  openAcceptDialog(index: number) {
    const dialogRef = this.dialog.open(WholesalerOrdersDialogAcceptComponent, {
      data: {
        quantity: this.ordersData[index].quantity,
        name: this.productsData[index].name,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        this.wholesalerOrdersService
          .delete(this.ordersData[index].id)
          .subscribe((response) => {
            this.ordersData[index].id = 0;
            this.retailSellerOrdersService
              .create(this.ordersData[index])
              .subscribe((response2) => {});
            this.toastr.success('Order Accepted', 'Success');
            this.timeToUpdate.emit();
          });
      }
    });
  }
}
