import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/product";
import { PurchaseData } from "../model/purchase-data.model";
import { DataTransferService } from "src/app/utils/data-transfer.service";
import { WholesalersService } from "src/app/services/wholesalers/wholesalers.service";
import { WholeSalerPurchaseData } from "../model/wholesaler-purchase-data.model";
import { Wholesaler } from "src/app/models/wholesaler";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-retail-seller-shopping-car-dialog-submit',
  templateUrl: './retail-seller-shopping-car-dialog-submit.component.html',
})



export class RetailSellerShoppingCarDialogSubmitComponent {

  public wholeSalersToPay: Map<number,WholeSalerPurchaseData> = new Map<number,WholeSalerPurchaseData>();

  public purchaseFormGroup:FormGroup = new FormGroup({
    operationCode: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<RetailSellerShoppingCarDialogSubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurchaseData,
    private wholeSalerService: WholesalersService
  ) {
    data.productsToPurchase.forEach((product: Product) => {
      this.wholeSalerService.getById(product.wholesalerId).subscribe( ( wholesaler: Wholesaler) => {
        if(!this.wholeSalersToPay.has(product.wholesalerId)) {
          const wholeSalerPurchaseData: WholeSalerPurchaseData = {
            totalAmount: product.price,
            creditCardNumber: wholesaler.creditCardNumber
          }
          this.wholeSalersToPay.set(product.wholesalerId, wholeSalerPurchaseData);
          return;
        }
        const wholeSalerPurchaseData: (WholeSalerPurchaseData | undefined) =  this.wholeSalersToPay.get(product.wholesalerId);
        wholeSalerPurchaseData!.totalAmount += product.price;
        this.wholeSalersToPay.set(product.wholesalerId, wholeSalerPurchaseData as WholeSalerPurchaseData);
      });
    });
    console.log(data);
  }

  get getBindedWholesalerData(){
    return Array.from(this.wholeSalersToPay.values());
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}

