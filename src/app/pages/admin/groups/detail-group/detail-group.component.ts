import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddMenberComponent } from './add-menber/add-menber.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.sass']
})
export class DetailGroupComponent {

  nameGroup = ""
  displayedColumns: string[] = ['createdAt', 'name', 'phone', 'actions'];
  dataSource: any = [];
  limitElements = 25;
  searchFinish = false;
  tokens: any = [{ count: 25, token: "" }];
  lengthData = 25;
  maxLength = -1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  companyId = ""
  groupId = ""

  constructor(
    private api: APIService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    private route: ActivatedRoute
  ) {
    this.companyId = sessionStorage.getItem("companyId") || "";
    this.groupId = this.route.snapshot.paramMap.get('id') || "";
    this.getMenbers('')
  }

  async addMenber(result) {
    let membersPromises: Promise<any>[] = []
    if ("action" in result) {
      result.data.forEach(element => {
        const payload = {
          id: element,
          groupID: this.groupId
        }
        membersPromises.push(this.addMenberPromise(payload))
      });
      await Promise.all(membersPromises).then(() => {
        this.getMenbers("")
        this.snackBar.open('Se han agregado los miembros al grupo', undefined, {
          duration: 6000
        });
      }).catch((err) => {
        this.snackBar.open('No se ha podido agregar los miembros al grupo, vuelva a intentarlo', undefined, {
          duration: 6000
        });
      });
    }
  }

  addMenberPromise(payload): Promise<any> {
    return new Promise((resolver, reject) => {
      this.api.UpdateCollaboratorData(payload).then(() => {
        resolver("successfull")
      }).catch((err) => {
        console.error(err)
        reject()
      })
    })
  }

  pageChange(event: any) {
    this.getMenbers(this.tokens[event.pageIndex].token, event)
  }

  getMenbers(token?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    this.api.ListCollaboratorByGroup(this.groupId, undefined, ModelSortDirection.DESC, undefined, this.limitElements, token).then(data => {
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

  openAdd() {
    const dialogRef = this.dialog.open(AddMenberComponent,
      {
        width: "480px"
      })

    dialogRef.afterClosed().subscribe(async (result) => {
      this.addMenber(result)
    })
  }

}
