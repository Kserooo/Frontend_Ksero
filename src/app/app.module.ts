import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
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
import { RetailSellerProfileComponent } from "./retail-seller/retail-seller-profile/retail-seller-profile.component";
import { RetailSellerProductsComponent } from './retail-seller/retail-seller-products/retail-seller-products.component';
import { RetailSellerPaymentComponent } from './retail-seller/retail-seller-payment/retail-seller-payment.component';
import { WholesalerProductsComponent } from './wholesaler/wholesaler-products/wholesaler-products.component';
import { WholesalerOrdersComponent } from './wholesaler/wholesaler-orders/wholesaler-orders.component';
import { RetailSellerShoppingCarComponent } from './retail-seller/retail-seller-shopping-car/retail-seller-shopping-car.component';
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RetailSellerNavbarComponent } from './retail-seller/retail-seller-navbar/retail-seller-navbar.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { WholesalerNavbarComponent } from './wholesaler/wholesaler-navbar/wholesaler-navbar.component';
import { ProductsService } from "./services/products/products.service";
import {WholesalersService} from "./services/wholesalers/wholesalers.service";
import {
  RetailSellerProductsDialogComponent
} from "./retail-seller/retail-seller-products/retail-seller-products-dialog/retail-seller-products-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {RetailSellersService} from "./services/retail-sellers/retail-sellers.service";
import {
  RetailSellerProductsDialogDeleteComponent
} from "./retail-seller/retail-seller-products/retail-seller-products-dialog-delete/retail-seller-products-dialog-delete.component";
import {
  WholesalerProductsDialogAddComponent
} from "./wholesaler/wholesaler-products/wholesaler-products-dialog-add/wholesaler-products-dialog-add.component";
import {
  WholesalerProductsDialogDeleteComponent
} from "./wholesaler/wholesaler-products/wholesaler-products-dialog-delete/wholesaler-products-dialog-delete.component";
import {
  WholesalerProductsDialogUpdateComponent
} from "./wholesaler/wholesaler-products/wholesaler-products-dialog-update/wholesaler-products-dialog-update.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";
import {
  RetailSellerProfileDialogUpdateComponent
} from "./retail-seller/retail-seller-profile/retail-seller-profile-dialog-update/retail-seller-profile-dialog-update.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {
  WholesalerProfileDialogUpdateComponent
} from "./wholesaler/wholesaler-profile/wholesaler-profile-dialog-update/wholesaler-profile-dialog-update.component";
import {
  RetailSellerPaymentDialogUpdateComponent
} from "./retail-seller/retail-seller-payment/retail-seller-payment-dialog-update/retail-seller-payment-dialog-update.component";
import {SenderService} from "./sender.service";
import {
  RetailSellerShoppingCarDialogSubmitComponent
} from "./retail-seller/retail-seller-shopping-car/retail-seller-shopping-car-dialog-submit/retail-seller-shopping-car-dialog-submit.component";
import {ToastrModule} from "ngx-toastr";
import { FilterPipe } from './tools/filter.pipe';
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {
  WholesalerOrdersDialogAcceptComponent
} from "./wholesaler/wholesaler-orders/wholesaler-orders-dialog-accept/wholesaler-orders-dialog-accept.component";
import {
  WholesalerOrdersDialogRejectComponent
} from "./wholesaler/wholesaler-orders/wholesaler-orders-dialog-reject/wholesaler-orders-dialog-reject.component";
import {RetailSellerOrdersService} from "./services/retail-seller-orders/retail-seller-orders.service";
import { RetailSellerOrdersComponent } from './retail-seller/retail-seller-orders/retail-seller-orders.component';

@NgModule({
  declarations: [
    WholesalerOrdersDialogRejectComponent,
    WholesalerOrdersDialogAcceptComponent,
    RetailSellerShoppingCarDialogSubmitComponent,
    RetailSellerPaymentDialogUpdateComponent,
    WholesalerProfileComponent,
    WholesalerProfileDialogUpdateComponent,
    RetailSellerProfileDialogUpdateComponent,
    WholesalerProductsDialogAddComponent,
    WholesalerProductsDialogDeleteComponent,
    WholesalerProductsDialogUpdateComponent,
    RetailSellerProductsDialogDeleteComponent,
    RetailSellerProductsDialogComponent,
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
    FilterPipe,
    RetailSellerOrdersComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    MatSlideToggleModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
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
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule,

  ],
  providers: [
    RetailSellerOrdersService,
    ProductsService,
    WholesalersService,
    RetailSellersService,
    SenderService,
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    WholesalerOrdersDialogRejectComponent,
    WholesalerOrdersDialogAcceptComponent,
    RetailSellerPaymentDialogUpdateComponent,
    WholesalerProfileDialogUpdateComponent,
    RetailSellerProductsDialogComponent,
    RetailSellerProductsDialogDeleteComponent,
    WholesalerProductsDialogAddComponent,
    WholesalerProductsDialogDeleteComponent,
    WholesalerProductsDialogUpdateComponent,
    RetailSellerProfileDialogUpdateComponent,
    RetailSellerShoppingCarDialogSubmitComponent,
  ]
})
export class AppModule { }
