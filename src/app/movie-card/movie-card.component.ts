/**
 * Renders a view of all movies the movies in the database
 * The movies are each represented in a movie card component
 * Also renders the NavigationLayoutComponent
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { NavigationLayoutComponent } from '../navigation-layout/navigation-layout.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  userFavs: any[] = [];

  // separate multiple methods with a comma
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }

  /**
   * Opens the director dialog
   * @param director object (director: <object>)
   */
  openDirectorDialog(director: object): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '500px',
      data: { director },
    });
  }

  /**
   * Opens the genre description
   * @param genre object (genre: <object>)
   */
  openGenreDialog(genre: object): void {
    this.dialog.open(GenreDialogComponent, {
      width: '500px',
      data: { genre },
    });
  }

  /**
   * Opens the movie's synopsis
   * @param movie.description (description: <string>)
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '500px',
      data: { description },
    });
  }

  /**
   * Add the movie to user favorites
   * @param movie id {id: <string>}
   */
  addToUserFavs(id: string): void {
    console.log(id);
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData.addFavMovie(username, id).subscribe((response: any) => {
      console.log(response);
    });
    // reloads the page to rerender the heart icons
    // this should be fixed
    this.ngOnInit();
  }

  /**
   * Remove the movie from user favorites
   * @param id {id: <string>}
   */
  removeFromUserFavs(id: string): void {
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData
      .removeFavMovie(username, id)
      .subscribe((response: any) => {
        console.log(response);
      });
    this.ngOnInit();
  }

  /**
   * This function sends an API call to
   * the database and sets the this.movies
   * properties to the response.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Calls the getFavMovies() API service and
   * sets this.userFavs to the response.
   * Username is fetched from local storage
   */
  getUserFavs(): void {
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData.getFavMovies(username).subscribe((response: any) => {
      this.userFavs = response.FavMovies;
      // console.log(this.userFavs);
      return this.userFavs;
    });
  }

  /**
   * determines if the movie is in the user favorites
   * @param id {id: string}
   * @returns boolean
   */
  isFav(id: string): boolean {
    const isFav = this.userFavs.indexOf(id) > -1;
    // console.log(isFav);
    return isFav;
  }
}
