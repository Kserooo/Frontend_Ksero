import {Injectable} from "@angular/core";
import {ShoppingCarOrder} from "./models/shopping-car-order";

@Injectable({
  providedIn: 'root'
})

export class SenderService{

  shoppingCarOrders: ShoppingCarOrder[]

  constructor() {
    this.shoppingCarOrders = [] as ShoppingCarOrder[];
  }

}
