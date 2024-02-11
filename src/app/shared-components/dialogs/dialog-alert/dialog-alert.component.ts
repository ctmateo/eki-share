import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AlertData {
  message: string;
  title:string;
}

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.sass']
})
export class DialogAlertComponent {
  message = ""
  title = ""
  
  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public alertData: AlertData
  ) {
    this.message = alertData.message
    this.title = alertData.title
  }
}
