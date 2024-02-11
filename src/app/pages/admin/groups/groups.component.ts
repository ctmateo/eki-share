import { Component, ViewChild } from '@angular/core';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CreateTeamComponent } from './create-team/create-team.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent {
  filterForm: FormGroup;
  attr = ["Id", "Nombre del grupo"];
  conditions = ["Igual", "Contiene"];
  displayedColumns: string[] = ['id', 'createdAt', 'name', 'menbers', 'actions'];
  dataSource: any = [];
  limitElements = 25;
  searchFinish = false;
  tokens: any = [{ count: 25, token: "" }];
  lengthData = 25;
  maxLength = -1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  companyId = ""

  constructor(
    private api: APIService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public utils: UtilsService
  ) {
    this.companyId = sessionStorage.getItem("companyId") || "";

    this.filterForm = new FormGroup({
      attribute: new FormControl('', Validators.required),
      condition: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required)
    })

    this.getGroups("")

  }


  getGroups(token?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {

    this.api.ListGroupsByCompanyId(this.companyId, undefined, ModelSortDirection.DESC, undefined, this.limitElements, token).then(data => {
      this.dataSource = data.items;
      if (data.nextToken == null) {
        this.searchFinish = true
        this.lengthData = ((this.tokens.length - 1) * 25) + data.items.length
      }
      if (this.searchFinish == false) {
        const token = { count: data.items.length, token: data.nextToken }
        if (event.previousPageIndex < event.pageIndex && (event.pageIndex - this.maxLength === 1)) {
          this.tokens.push(token)
          this.lengthData = ((this.tokens.length - 1) * 25) + 1
          this.maxLength = event.pageIndex
        }
      }
    }).catch(err => { console.error(err) })
  }

  pageChange(event: any) {
    this.getGroups(this.tokens[event.pageIndex].token, event)
  }


  openCreate() {
    const dialogRef = this.dialog.open(CreateTeamComponent,
      {
        width: "480px"
      })

    dialogRef.afterClosed().subscribe(async (result) => {
      this.createGroupRegister(result)
    })
  }

  createGroupRegister(respond) {
    if ("action" in respond) {
      const payload: any = {
        companyID: this.companyId,
        name: respond.name,
        description: respond.description
      }
      this.api.CreateGroups(payload).then(data => {
        this.snackBar.open('Se ha creado un nuevo grupo', undefined, {
          duration: 6000
        });
        this.getGroups("")
      }).catch((err) => {
        console.error(err)
        this.snackBar.open('No se ha podido crear el grupo, vuelva a intentarlo', undefined, {
          duration: 6000
        });
      })
    }
  }
}
