import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  constructor(public fetchApiData: FetchApiDataService) {}

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
    this.fetchApiData.deleteUser(this.user.Username).subscribe((response) => {
      console.log(response);
    });
  }
}
