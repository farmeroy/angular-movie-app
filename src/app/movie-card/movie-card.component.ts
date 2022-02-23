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

  openDirectorDialog(director: object): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '500px',
      data: { director },
    });
  }

  openGenreDialog(genre: object): void {
    this.dialog.open(GenreDialogComponent, {
      width: '500px',
      data: { genre },
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '500px',
      data: { description },
    });
  }

  addToUserFavs(id: string): void {
    console.log(id);
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData.addFavMovie(username, id).subscribe((response: any) => {
      console.log(response);
    });
    this.ngOnInit();
  }

  removeFromUserFavs(id: string): void {
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData
      .removeFavMovie(username, id)
      .subscribe((response: any) => {
        console.log(response);
      });
    this.ngOnInit();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUserFavs(): void {
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData.getFavMovies(username).subscribe((response: any) => {
      this.userFavs = response.FavMovies;
      console.log(this.userFavs);
      return this.userFavs;
    });
  }

  isFav(id: string): boolean {
    const isFav = this.userFavs.indexOf(id) > -1;
    console.log(isFav);
    return isFav;
  }
}
