import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Order} from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class RetailSellerOrdersService {

  // Endpoint
  basePath = 'https://backendkseroapi-1682979685313.azurewebsites.net/api/v1/retail-seller-orders'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
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
