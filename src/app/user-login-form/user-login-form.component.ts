import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  isLoading = false;

  ngOnInit(): void {}

  loginUser(): void {
    this.isLoading = true;
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('Username', response.user.Username);
      this.router.navigate(['movies']);
      this.dialogRef.close();
      this.snackBar.open('login successful', 'OK', {
        duration: 2000,
      }),
        (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('Username', response.user.Username);
          this.snackBar.open(response, 'OK', {
            duration: 2000,
          });
        };
    });
  }
}
