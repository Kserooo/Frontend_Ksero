import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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

import { RetailSellerProfileComponent } from './retail-seller/retail-seller-profile/retail-seller-profile.component';
import { RetailSellerProductsComponent } from './retail-seller/retail-seller-products/retail-seller-products.component';
import { RetailSellerPaymentComponent } from './retail-seller/retail-seller-payment/retail-seller-payment.component';

import { WholesalerOrdersComponent } from './wholesaler/wholesaler-orders/wholesaler-orders.component';
import { RetailSellerShoppingCarComponent } from './retail-seller/retail-seller-shopping-car/retail-seller-shopping-car.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ProductsService } from './services/products/products.service';
import { WholesalersService } from './services/wholesalers/wholesalers.service';
import { RetailSellerProductsDialogComponent } from './retail-seller/retail-seller-products/retail-seller-products-dialog/retail-seller-products-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RetailSellersService } from './services/retail-sellers/retail-sellers.service';
import { RetailSellerProductsDialogDeleteComponent } from './retail-seller/retail-seller-products/retail-seller-products-dialog-delete/retail-seller-products-dialog-delete.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { RetailSellerProfileDialogUpdateComponent } from './retail-seller/retail-seller-profile/retail-seller-profile-dialog-update/retail-seller-profile-dialog-update.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RetailSellerPaymentDialogUpdateComponent } from './retail-seller/retail-seller-payment/retail-seller-payment-dialog-update/retail-seller-payment-dialog-update.component';
import { SenderService } from './sender.service';
import { RetailSellerShoppingCarDialogSubmitComponent } from './retail-seller/retail-seller-shopping-car/retail-seller-shopping-car-dialog-submit/retail-seller-shopping-car-dialog-submit.component';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './tools/filter.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { WholesalerOrdersDialogAcceptComponent } from './wholesaler/wholesaler-orders/wholesaler-orders-dialog-accept/wholesaler-orders-dialog-accept.component';
import { WholesalerOrdersDialogRejectComponent } from './wholesaler/wholesaler-orders/wholesaler-orders-dialog-reject/wholesaler-orders-dialog-reject.component';
import { RetailSellerOrdersService } from './services/retail-seller-orders/retail-seller-orders.service';
import { RetailSellerOrdersComponent } from './retail-seller/retail-seller-orders/retail-seller-orders.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './auth/jwt-interceptor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';

// Views
import { WholesalerProductViewComponent } from './pages/wholesaler/wholesaler-products-view/wholesaler-products-view.component';
import { WholesalerProfileViewComponent } from './pages/wholesaler/wholesaler-profile-view/wholesaler-profile-view.component';


// Components from Wholesaler
import { WholesalerProductsDialogAddComponent } from './pages/wholesaler/wholesaler-products-view/wholesaler-products-dialog-add/wholesaler-products-dialog-add.component';
import { WholesalerProductsDialogDeleteComponent } from './pages/wholesaler/wholesaler-products-view/wholesaler-products-dialog-delete/wholesaler-products-dialog-delete.component';
import { WholesalerProductsDialogUpdateComponent } from './pages/wholesaler/wholesaler-products-view/wholesaler-products-dialog-update/wholesaler-products-dialog-update.component';

// Components
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { WholesaleProfileViewDialogUpdateComponent } from './pages/wholesaler/wholesaler-profile-view/wholesale-profile-view-dialog-update/wholesale-profile-view-dialog-update.component';
import { WholesalerNavbarComponent } from './components/wholesaler-navbar/wholesaler-navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProductShowCardComponent } from './components/products/product-show-card/product-show-card.component';
import { OnlyNumberDirective } from './only-number.directive';
import { BuyProductCardComponent } from './components/products/buy-product-card/buy-product-card.component';

@NgModule({
  declarations: [
    WholesalerOrdersDialogRejectComponent,
    WholesalerOrdersDialogAcceptComponent,
    RetailSellerShoppingCarDialogSubmitComponent,
    RetailSellerPaymentDialogUpdateComponent,
    WholesalerProductsDialogUpdateComponent,
    RetailSellerProfileDialogUpdateComponent,
    RetailSellerProductsDialogDeleteComponent,
    RetailSellerProductsDialogComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RetailSellerProfileComponent,
    RetailSellerProductsComponent,
    RetailSellerPaymentComponent,
    WholesalerOrdersComponent,
    RetailSellerShoppingCarComponent,
    FilterPipe,
    RetailSellerOrdersComponent,
    HomeNavbarComponent,
    WholesalerProductViewComponent,
    WholesalerProductsDialogAddComponent,
    WholesalerProductsDialogDeleteComponent,
    WholesalerProductsDialogUpdateComponent,
    WholesaleProfileViewDialogUpdateComponent,
    WholesalerNavbarComponent,
    WholesalerProfileViewComponent,
    ToolbarComponent,
    ProductShowCardComponent,
    OnlyNumberDirective,
    BuyProductCardComponent
  ],
  imports: [
    ToastrModule.forRoot({
      preventDuplicates: true,
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
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDividerModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    RetailSellerOrdersService,
    ProductsService,
    WholesalersService,
    RetailSellersService,
    SenderService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    WholesalerOrdersDialogRejectComponent,
    WholesalerOrdersDialogAcceptComponent,
    RetailSellerPaymentDialogUpdateComponent,
    RetailSellerProductsDialogComponent,
    RetailSellerProductsDialogDeleteComponent,
    WholesalerProductsDialogAddComponent,
    WholesalerProductsDialogDeleteComponent,
    WholesalerProductsDialogUpdateComponent,
    RetailSellerProfileDialogUpdateComponent,
    RetailSellerShoppingCarDialogSubmitComponent,
  ],
})
export class AppModule {}
