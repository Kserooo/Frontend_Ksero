import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-wholesaler-orders-dialog-accept',
  templateUrl: './wholesaler-orders-dialog-accept.component.html',
})



export class WholesalerOrdersDialogAcceptComponent {

  constructor(
    public dialogRef: MatDialogRef<WholesalerOrdersDialogAcceptComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ quantity: number, name: string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
