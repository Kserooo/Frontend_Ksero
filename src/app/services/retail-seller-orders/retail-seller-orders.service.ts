import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Order} from "../../models/order";
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class RetailSellerOrdersService {

  // Endpoint
  basePath = `${environment.serviceBasePath}/api/v1/retail-seller-orders`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  public static toastr: ToastrService;
  constructor(private http: HttpClient, private _toastr: ToastrService) {
    RetailSellerOrdersService.toastr = _toastr;
  }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    let message: string = "An error occurred in our services. Try again later";
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
      message = `An error occurred: ${error.error.message} `;
      
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    RetailSellerOrdersService.toastr.error(message, "Error");
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  create(item: any): Observable<Order> {
    return this.http.post<Order>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  getById(id: any): Observable<Order> {
    return this.http.get<Order>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByRetailSellerId(id: any): Observable<Order> {
    return this.http.get<Order>(`${this.basePath}/retailSellerId/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All
  getAll(): Observable<Order> {
    return this.http.get<Order>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }



  // Update
  update(id: any, item: any): Observable<Order> {
    return this.http.put<Order>(`${this.basePath}/${id}`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
