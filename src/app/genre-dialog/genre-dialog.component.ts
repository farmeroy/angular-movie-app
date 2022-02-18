import { Component, OnInit, Inject } from '@angular/core';
import  { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  template: 'passed in {{ data.genre }}',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) { }

  ngOnInit(): void {
  }

}
