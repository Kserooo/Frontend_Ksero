import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, retry, switchMap, throwError} from "rxjs";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Endpoint
  basePath = 'https://ksero.herokuapp.com/api/v1/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  currentUser!: User;
  private _authenticated: boolean = false;
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

  create(item: any): Observable<User> {
    return this.http.post<User>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  getById(id: any): Observable<User> {
    return this.http.get<User>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Get All
  getAll(): Observable<User> {
    return this.http.get<User>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByUsername(username: any): Observable<User> {
    return this.http.get<User>(`${this.basePath}/?username=${username}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update
  update(id: any, item: any): Observable<User> {
    return this.http.put<User>(`${this.basePath}/${id}`, item, this.httpOptions)
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
