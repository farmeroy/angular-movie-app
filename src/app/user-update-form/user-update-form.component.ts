import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss'],
})
export class UserUpdateFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>
  ) {}

  ngOnInit(): void {}

  updateUserDetails(): void {
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData
      .updateUserDetails(username, this.userData)
      .subscribe((response) => {
        console.log(response);
        this.dialogRef.close();
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
