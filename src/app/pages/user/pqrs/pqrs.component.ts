import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { ErrorAlertComponent } from 'src/app/shared-components/dialogs/error-alert/error-alert.component';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.sass'],
})
export class PqrsComponent {


  dataSource: any = [];
  buttonDisabled: boolean = false;
  constructor(
    public dialog: MatDialog,
    private api: APIService
  ) {
  }

  ngOnInit() {
    this.getFrequentQuestions();
  }



  async getFrequentQuestions(token?) {
    this.api.ListFrequentQuestions(token).then((data: any) => {
      this.dataSource = data.items;
    })
  }
  openAlert() {
    const dialogRef = this.dialog.open(ErrorAlertComponent, {
      width: "580px",
    })
  }

  handleButtonClick() {
    this.openAlert()
  }
}
