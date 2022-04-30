import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from "./app-routing.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WholesalerProfileComponent } from './wholesaler/wholesaler-profile/wholesaler-profile.component';
import {RetailSellerProfileComponent} from "./retail-seller/retail-seller-profile/retail-seller-profile.component";
import { RetailSellerProductsComponent } from './retail-seller/retail-seller-products/retail-seller-products.component';
import { RetailSellerPaymentComponent } from './retail-seller/retail-seller-payment/retail-seller-payment.component';
import { WholesalerProductsComponent } from './wholesaler/wholesaler-products/wholesaler-products.component';
import { WholesalerOrdersComponent } from './wholesaler/wholesaler-orders/wholesaler-orders.component';
import { RetailSellerShoppingCarComponent } from './retail-seller/retail-seller-shopping-car/retail-seller-shopping-car.component';
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import { RetailSellerNavbarComponent } from './retail-seller/retail-seller-navbar/retail-seller-navbar.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { WholesalerNavbarComponent } from './wholesaler/wholesaler-navbar/wholesaler-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WholesalerProfileComponent,
    RetailSellerProfileComponent,
    RetailSellerProductsComponent,
    RetailSellerPaymentComponent,
    WholesalerProductsComponent,
    WholesalerOrdersComponent,
    RetailSellerShoppingCarComponent,
    RetailSellerNavbarComponent,
    HomeNavbarComponent,
    WholesalerNavbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    RouterModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
