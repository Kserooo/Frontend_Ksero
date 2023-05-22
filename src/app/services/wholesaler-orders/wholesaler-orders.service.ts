import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Order} from "../../models/order";
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class WholesalerOrdersService {

  // Endpoint
  basePath = `${environment.serviceBasePath}/api/v1/wholesaler-orders`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public static toastr: ToastrService;
  constructor(private http: HttpClient, private _toastr: ToastrService) {
    WholesalerOrdersService.toastr = _toastr;
  }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    let message: string = "An error occurred in our services. Try again later";
    let typo: string = "Error";
    message = `An error occured: ${error.error}`;
    typo = (error.status === 500)?"Error": "Info";
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
      
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    if(typo === "Error") {
      WholesalerOrdersService.toastr.error(message, "Error");
    } else {
      WholesalerOrdersService.toastr.info(message, "Info");
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  create(item: any): Observable<Order> {
    return this.http.post<Order>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Student by id
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
    return this.http.put<Order>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
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
