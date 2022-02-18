import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  template: 'passed in {{ data.director }}',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss'],
})
export class DirectorDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { director: any }) {}

  // name = this.data.director["Name"];

  ngOnInit(): void {
    console.log(this.data);
  }
}
