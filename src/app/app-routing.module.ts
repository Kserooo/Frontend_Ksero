import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {RetailSellerProfileComponent} from "./retail-seller/retail-seller-profile/retail-seller-profile.component";
import {WholesalerProfileViewComponent} from "./pages/wholesaler-profile-view/wholesaler-profile-view.component";
import {RetailSellerProductsComponent} from "./retail-seller/retail-seller-products/retail-seller-products.component";
import {RetailSellerPaymentComponent} from "./retail-seller/retail-seller-payment/retail-seller-payment.component";
import {RetailSellerShoppingCarComponent} from "./retail-seller/retail-seller-shopping-car/retail-seller-shopping-car.component";
import {WholesalerProductViewComponent} from "./pages/wholesaler-products-view/wholesaler-products-view.component";
import {WholesalerOrdersComponent} from "./wholesaler/wholesaler-orders/wholesaler-orders.component";
import {RetailSellerOrdersComponent} from "./retail-seller/retail-seller-orders/retail-seller-orders.component";
import {RetailSellerGuard} from "./auth/guards/retail-seller/retail-seller.guard";
import {WholesalerGuard} from "./auth/guards/wholesaler/wholesaler.guard";
import {NoAuthGuard} from "./auth/guards/no-auth/no-auth.guard";

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'},


  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'register', component: RegisterComponent},
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent},
    ]
  },

  {
    path: 'retail-seller/:id',
    canActivate: [RetailSellerGuard],
    canActivateChild: [RetailSellerGuard],
    children:[
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: RetailSellerProfileComponent},
      { path: 'products', component: RetailSellerProductsComponent},
      { path: 'payment', component: RetailSellerPaymentComponent},
      { path: 'shopping-car', component: RetailSellerShoppingCarComponent},
      { path: 'orders', component: RetailSellerOrdersComponent}
    ]
  },
  {
    path: 'wholesaler/:id',
    canActivate: [WholesalerGuard],
    canActivateChild: [WholesalerGuard],
    children:[
      { path: '', redirectTo: 'profile',pathMatch: 'full'},
      { path: 'profile', component: WholesalerProfileViewComponent},
      { path: 'products', component: WholesalerProductViewComponent},
      { path: 'orders', component: WholesalerOrdersComponent},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
