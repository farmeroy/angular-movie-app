import { Injectable } from '@angular/core';
// CF differs, imports catchErro from rxjs/internal/operators
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declare the api url
const apiUrl = ' http://pre-code-flix.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will prove HttpClient to the class, making it available via this.http
  constructor(private http: HttpClient) {}
  // call the user regeistration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status} ` + `Error Body is: ${error.error}`
      );
    }
    return throwError('Something bad happend, please try again later.');
  }
}

export class FetchApiDataService {
  constructor() {}
}
