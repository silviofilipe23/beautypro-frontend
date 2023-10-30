import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cancel',
  templateUrl: './dialog-cancel.component.html',
  styleUrls: ['./dialog-cancel.component.scss'],
})
export class DialogCancelComponent implements OnInit {
  text: string;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCancelComponent>,
    @Inject(DIALOG_DATA) public data: { text?: string; title?: string }
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.text = this.data.text;
  }
}
