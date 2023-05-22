import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Product} from "../../models/product";
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Endpoint
  basePath = `${environment.serviceBasePath}/api/v1/products`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  GetHttpOptionsWithToken(token: any){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }

  public static toastr: ToastrService;

  constructor(private http: HttpClient, private _toastr: ToastrService) {
    ProductsService.toastr = _toastr;
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
      ProductsService.toastr.error(message, "Error");
    } else {
      ProductsService.toastr.info(message, "Info");
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  // Create Student
  create(item: any): Observable<Product> {
    console.log('Item --> ', JSON.stringify(item));
    return this.http.post<Product>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Student by id
  getById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByWholesalerId(id: any):Observable<Product>{
    return this.http.get<Product>(`${this.basePath}/wholesalerId/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All
  getAll(): Observable<Product> {
    return this.http.get<Product>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update
  update(id: any, item: any): Observable<Product> {
    return this.http.put<Product>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
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
