import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {RetailSellerProfileComponent} from "./retail-seller/retail-seller-profile/retail-seller-profile.component";
import {WholesalerProfileComponent} from "./wholesaler/wholesaler-profile/wholesaler-profile.component";
import {RetailSellerProductsComponent} from "./retail-seller/retail-seller-products/retail-seller-products.component";
import {RetailSellerPaymentComponent} from "./retail-seller/retail-seller-payment/retail-seller-payment.component";
import {RetailSellerShoppingCarComponent} from "./retail-seller/retail-seller-shopping-car/retail-seller-shopping-car.component";
import {WholesalerProductsComponent} from "./wholesaler/wholesaler-products/wholesaler-products.component";
import {WholesalerOrdersComponent} from "./wholesaler/wholesaler-orders/wholesaler-orders.component";

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'retail-seller/:id', children:[
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: RetailSellerProfileComponent},
      { path: 'products', component: RetailSellerProductsComponent},
      { path: 'payment', component: RetailSellerPaymentComponent},
      { path: 'shopping-car', component: RetailSellerShoppingCarComponent}
    ]
  },
  { path: 'wholesaler/:id', children:[
      { path: '', redirectTo: 'profile',pathMatch: 'full'},
      { path: 'profile', component: WholesalerProfileComponent},
      { path: 'products', component: WholesalerProductsComponent},
      { path: 'orders', component: WholesalerOrdersComponent},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
