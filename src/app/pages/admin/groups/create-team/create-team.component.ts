import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.sass']
})
export class CreateTeamComponent {
  groupForm!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<CreateTeamComponent>,
  ) {
    this.groupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    })
  }

  create() {
    if (this.groupForm.valid) {
      const response = {
        action: "create",
        name: this.groupForm.controls['name'].value,
        descrition: this.groupForm.controls['description'].value,
      }

      this.dialogRef.close(response);
    }
  }


}
