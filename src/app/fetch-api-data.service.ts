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
const apiUrl = ' https://pre-code-flix.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will prove HttpClient to the class, making it available via this.http
  constructor(private http: HttpClient) {}
  // call the user registration endpoint
  /**
   * API call to register a new user
   * @param userDetails {Username: <string>, Password: <string>
   * Email: <string>, BirthDate: <date>}
   * @returns the data for the new user in JSON formate
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to login
   * @param loginDetails {Username: <string>, Password: <string>}
   * @returns a JSON object containing the user details object and a JWT token
   */
  public userLogin(loginDetails: any): Observable<any> {
    console.log(loginDetails);
    return this.http
      .post(apiUrl + 'login', loginDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get all movies
   */
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

  /** API call to get the details of one movie
   * @param movieTitle <string>
   * @returns object containing movie details
   */
  public getMovieDetails(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies${movieTitle}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get details about a movie's director
   * @param directorName <string>
   * @returns object containing director data
   */
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

  /**
   * API call to get genre details
   * @param movieTitle <string>
   * @retunrs genre object
   */
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

  /**
   * API call to get user details
   * @param username <string>
   * @returns user object
   */
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

  /**
   * API call to get user's favorite movies
   * @param username <string>
   * @returns JSON object with movie ids
   */
  public getFavMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return (
      this.http
        .get(`${apiUrl}users/${username}`, {
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

  /**
   * API call to add a movie to user favorites
   * @param username <string>
   * @param movieID <string>
   */

  public addFavMovie(username: string, movieID: string): Observable<any> {
    console.log('fetchAPI ln 112', movieID);
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

  /**
   * API call to update a user's details
   * @param username <string>
   * @param userDetails <object> `{Username: <string>, Password: <string>, Email: <string>, Birthday: <date>}`
   * @returns userDetails as JSON object
   */
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

  /**
   * API call to delete a user account
   * @param username <string>
   * @returns confirmation message
   */
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

  /**
   * API call to remove a movie from user favorites
   * @param username <string>
   * @param movieID <string>
   */

  public removeFavMovie(
    username: string,
    movieID: string
  ): Observable<unknown> {
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}users/${username}/movies/remove/${movieID}`, movieID, {
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

  // this is the error handler piped into each API call
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status} ` + `Error Body is: ${error.error}`
      );
    }
    return throwError('Something bad happened, please try again later.');
  }
}
