import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SelectCollaborator } from 'src/app/pages/admin/path/find-collaborator/find-collaborator.component';

@Component({
  selector: 'app-add-menber',
  templateUrl: './add-menber.component.html',
  styleUrls: ['./add-menber.component.sass']
})
export class AddMenberComponent {

  companyId: string;
  displayedColumns: string[] = ['select', 'name']
  collaborators: any[] = []
  limitElements = 5;
  searchFinish = false;
  tokens = [{ count: 5, token: "" }];
  lengthPath = 5;
  maxLength = -1;
  isLoading = false
  selection = new SelectionModel<SelectCollaborator>(true, []);

  constructor(
    private api: APIService,
    public dialogRef: MatDialogRef<AddMenberComponent>,
  ) {
    this.companyId = sessionStorage.getItem("companyId") || "";
    this.getCollaborator()
  }

  toggleSelection(item: SelectCollaborator): void {
    this.selection.toggle(item);
  }

  getCollaborator(token?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    this.isLoading = true
    this.api.ListCollaboratorDatabyCompanyID(this.companyId, undefined, ModelSortDirection.DESC, undefined, this.limitElements, token).then((data: any) => {
      this.collaborators = data.items.map((item) => {
        return {
          name: item?.fullName,
          id: item?.id,
          phone: item?.user.phone
        }
      })

      if (data.nextToken == null) {
        this.searchFinish = true
        this.lengthPath = this.tokenLength() + data.items.length
      }
      if (this.searchFinish == false) {
        const token = { count: data.items.length, token: data.nextToken }
        if (event.previousPageIndex < event.pageIndex && (event.pageIndex - this.maxLength === 1)) {
          this.tokens.push(token)
          this.lengthPath = this.tokenLength()
          this.maxLength = event.pageIndex
        }
      }
    }).catch(err => console.error(err)).finally(() => {
      this.isLoading = false
    })
  }

  tokenLength() {
    return ((this.tokens.length - 1) * 5) + 1
  }

  pageChange(event: any) {
    // this.selection.clear()
    this.getCollaborator(this.tokens[event.pageIndex].token, event)
  }

  addMenbers() {
    const result = {
      data: this.selection.selected,
      action: 'create'
    }
    this.dialogRef.close(result)
  }
}
