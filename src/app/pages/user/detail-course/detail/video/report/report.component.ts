import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  reporForm!:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm(){
    this.reporForm = new FormGroup({
      report:new FormControl('',[Validators.required,Validators.maxLength(500),Validators.minLength(8)])
    })
  }

  cancel(){
    this.dialogRef.close('')
  }

}
