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
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    data: {
      name: 'home',
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        data: { name: 'home' },
      },
      { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
    ],
  },

  {
    path: 'retail-seller',
    data: {
      name: 'retail-seller',
    },
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
        data: { name: 'retail-seller-profile' },
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: RetailSellerProfileComponent,
        data: { name: 'retail-seller-profile' },
      },
      {
        path: 'products',
        canActivate: [AuthGuard],
        data: { name: 'retail-seller-products' },
        component: RetailSellerProductsComponent,
      },
      {
        path: 'shopping-car',
        canActivate: [AuthGuard],
        data: { name: 'retail-seller-shopping-cart' },
        component: RetailSellerShoppingCarComponent,
      },
      {
        path: 'orders',
        canActivate: [AuthGuard],
        data: { name: 'retail-seller-orders' },
        component: RetailSellerOrdersComponent,
      },
    ],
  },
  {
    path: 'wholesaler',
    data: {
      name: 'wholesaler',
    },
    children: [
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: WholesalerProfileViewComponent,
        data: { name: 'wholesaler-profile' },
      },
      {
        path: 'products',
        canActivate: [AuthGuard],
        component: WholesalerProductViewComponent,
        data: { name: 'wholesaler-products' },
      },
      {
        path: 'orders',
        canActivate: [AuthGuard],
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
