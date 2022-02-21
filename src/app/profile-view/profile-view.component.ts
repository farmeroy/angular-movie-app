import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
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
    this.dialog.open(UserUpdateFormComponent, { width: '500px' });
  }

  deleteUser(): void {
    this.dialog.open(DeleteUserDialogComponent, { width: '500px' });
  }
}
