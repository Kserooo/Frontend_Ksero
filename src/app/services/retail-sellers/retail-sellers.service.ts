import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, retry, switchMap, throwError} from "rxjs";
import {RetailSeller} from "../../models/retail-seller";
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class RetailSellersService {

  // Endpoint
  basePath = `${environment.serviceBasePath}/api/v1/retail-sellers`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  currentUser!: RetailSeller;
  private _authenticated: boolean = false;
  public static toastr: ToastrService;
  constructor(private http: HttpClient, private _toastr: ToastrService) {
    RetailSellersService.toastr = _toastr;
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
      RetailSellersService.toastr.error(message, "Error");
    } else {
      RetailSellersService.toastr.info(message, "Info");
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  set accessToken(token: string)
  {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string
  {
    return localStorage.getItem('accessToken') ?? '';
  }

  signIn(username: string, password: string){
    return this.http.get<string>(`${this.basePath}?username=${username}&password=${password}`,)
      .pipe(retry(2),catchError(this.handleError));
  }

  get isSignedIn(): boolean{
    let accessToken = localStorage.getItem('accessToken');
    return accessToken != null;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  create(item: any): Observable<RetailSeller> {
    return this.http.post<RetailSeller>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  getById(id: any): Observable<RetailSeller> {
    return this.http.get<RetailSeller>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Get All
  getAll(): Observable<RetailSeller> {
    return this.http.get<RetailSeller>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByUsername(username: any): Observable<RetailSeller> {
    return this.http.get<RetailSeller>(`${this.basePath}/retailSellerUsername/${username}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update
  update(id: any, item: any): Observable<RetailSeller> {
    return this.http.put<RetailSeller>(`${this.basePath}/${id}`, item, this.httpOptions)
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
