import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RetailSellerProfileComponent } from './retail-seller/retail-seller-profile/retail-seller-profile.component';
import { WholesalerProfileViewComponent } from './pages/wholesaler/wholesaler-profile-view/wholesaler-profile-view.component';
import { RetailSellerProductsComponent } from './retail-seller/retail-seller-products/retail-seller-products.component';
import { RetailSellerPaymentComponent } from './retail-seller/retail-seller-payment/retail-seller-payment.component';
import { RetailSellerShoppingCarComponent } from './retail-seller/retail-seller-shopping-car/retail-seller-shopping-car.component';
import { WholesalerProductViewComponent } from './pages/wholesaler/wholesaler-products-view/wholesaler-products-view.component';
import { WholesalerOrdersComponent } from './wholesaler/wholesaler-orders/wholesaler-orders.component';
import { RetailSellerOrdersComponent } from './retail-seller/retail-seller-orders/retail-seller-orders.component';
import { RetailSellerGuard } from './auth/guards/retail-seller/retail-seller.guard';
import { WholesalerGuard } from './auth/guards/wholesaler/wholesaler.guard';
import { NoAuthGuard } from './auth/guards/no-auth/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    data: {
      name: 'home',
    },
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        data: { name: 'home' },
      },
      { path: 'register', component: RegisterComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ],
  },

  {
    path: 'retail-seller/:id',
    data: {
      name: 'retail-seller',
    },
    canActivate: [RetailSellerGuard],
    canActivateChild: [RetailSellerGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
        data: { name: 'retail-seller-profile' },
      },
      {
        path: 'profile',
        component: RetailSellerProfileComponent,
        data: { name: 'retail-seller-profile' },
      },
      {
        path: 'products',
        data: { name: 'retail-seller-products' },
        component: RetailSellerProductsComponent,
      },
      {
        path: 'payment',
        data: { name: 'retail-seller-payments' },
        component: RetailSellerPaymentComponent,
      },
      {
        path: 'shopping-car',
        data: { name: 'retail-seller-shopping-cart' },
        component: RetailSellerShoppingCarComponent,
      },
      {
        path: 'orders',
        data: { name: 'retail-seller-orders' },
        component: RetailSellerOrdersComponent,
      },
    ],
  },
  {
    path: 'wholesaler/:id',
    data: {
      name: 'wholesaler',
    },
    canActivate: [WholesalerGuard],
    canActivateChild: [WholesalerGuard],
    children: [
      {
        path: 'profile',
        component: WholesalerProfileViewComponent,
        data: { name: 'wholesaler-profile' },
      },
      {
        path: 'products',
        component: WholesalerProductViewComponent,
        data: { name: 'wholesaler-products' },
      },
      {
        path: 'orders',
        component: WholesalerOrdersComponent,
        data: { name: 'wholesaler-orders' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
