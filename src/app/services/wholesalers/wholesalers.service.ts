import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, retry, throwError} from "rxjs";
import { Wholesaler} from "../../models/wholesaler";
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class WholesalersService {

  // Endpoint
  basePath = `${environment.serviceBasePath}/api/v1/wholesalers`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public static toastr: ToastrService;
  constructor(private http: HttpClient, private _toastr: ToastrService) {
    WholesalersService.toastr = _toastr;
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
    WholesalersService.toastr.error(message, "Error");
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  signIn(username: string, password: string){
    return this.http.get<string>(`${this.basePath}?username=${username}&password=${password}`,)
      .pipe(retry(2),catchError(this.handleError));
  }

  get isSignedIn(): boolean{
    let accessToken = localStorage.getItem('accessToken');
    return accessToken != null;
  }

  create(item: any): Observable<Wholesaler> {
    return this.http.post<Wholesaler>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getById(id: any): Observable<Wholesaler> {
    return this.http.get<Wholesaler>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByUsername(username: any): Observable<Wholesaler> {
    return this.http.get<Wholesaler>(`${this.basePath}/wholesalerUsername/${username}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Get All
  getAll(): Observable<Wholesaler> {
    return this.http.get<Wholesaler>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update
  update(id: any, item: any): Observable<Wholesaler> {
    return this.http.put<Wholesaler>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
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
