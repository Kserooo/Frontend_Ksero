import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import {Observable} from "rxjs";
import {RetailSellersService} from "../services/retail-sellers/retail-sellers.service";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let retailSellerService = this.injector.get(RetailSellersService)
    let token = req.clone({
      setHeaders:{
        Authorization: `Bearer ${retailSellerService.getToken()}`
      }
    })
    return next.handle(token);
  }
}
