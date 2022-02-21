import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-layout',
  templateUrl: './navigation-layout.component.html',
  styleUrls: ['./navigation-layout.component.scss'],
})
export class NavigationLayoutComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
    this.router.navigate(['']);
  }
}
