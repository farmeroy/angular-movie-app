import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  valueForm = new FormGroup({
    input: new FormControl(),
    username: new FormControl(),
  });

  onSubmit() {
    console.log(this.valueForm.value);
  }
  // placeholder for our basic form
  value = '';

  title = 'myFlix-Angular-client';
}
