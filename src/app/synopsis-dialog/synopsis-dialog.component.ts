import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-dialog',
  template: 'passed in {{ data.description }}',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss'],
})
export class SynopsisDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string }) {}

  ngOnInit(): void {}
}
