import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Wholesaler} from "../../models/wholesaler";

@Injectable({
  providedIn: 'root'
})
export class WholesalersService {

  // Endpoint
  basePath = 'http://localhost:3000/wholesalers';

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
    return this.http.get<Wholesaler>(`${this.basePath}/?username=${username}`, this.httpOptions)
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
