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
// logic for error handling

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
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

  public userLogin(loginDetails: any): Observable<any> {
    console.log(loginDetails);
    return this.http
      .post(apiUrl + 'login', loginDetails)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getMovieDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirectorDetails(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getGenreDetails(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${movieTitle}/genre`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // set this back to string?
  public getUserDetails(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getFavMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return (
      this.http
        .get(`${apiUrl}/users/${username}`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        })
        // this just returns the user object
        // must add a filter function to only return
        // response.data.FavMovies
        // try: map(this.extractResponseData).FavMovies ?
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  public addFavMovie(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}users/${username}/movies/${movieID}`, movieID, {
        headers: new HttpHeaders({
          'Content-Type': 'text/html',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public updateUserDetails(
    username: string,
    userDetails: any
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}users/${username}/update`, userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteUser(username: string): Observable<unknown> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}users/${username}/delete`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  public removeFavMovie(
    username: string,
    movieID: string
  ): Observable<unknown> {
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}users/${username}/movies/${movieID}`, movieID, {
        headers: new HttpHeaders({
          'Content-Type': 'text/html',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
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
