import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  user: any = {};

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const username = localStorage.getItem('Username');
    this.fetchApiData.getUserDetails(username).subscribe((response: any) => {
      this.user = response;
      console.log(response);
      return this.user;
    });
  }

  updateUserDetails(): void {
    this.fetchApiData
      .updateUserDetails(this.user.Username, this.user)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  deleteUser(): void {
    const username = this.user.Username;
    console.log(username);
  }
}
