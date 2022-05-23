import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-wholesaler-orders-dialog-reject',
  templateUrl: './wholesaler-orders-dialog-reject.component.html',
})



export class WholesalerOrdersDialogRejectComponent {

  constructor(
    public dialogRef: MatDialogRef<WholesalerOrdersDialogRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ quantity: number, name: string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
