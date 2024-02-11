// profile-config.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService, CreateUserDataInput, UpdateUserDataInput, UpdateUserInput } from 'src/app/API.service';
import { fadeIn } from 'src/app/animation/animation';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile-config',
  animations: [fadeIn()],
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.sass']
})
export class ProfileConfigComponent implements OnInit {
  buttonDisabled: boolean = false;

  profileForm: FormGroup;
  userData: any = [];
  userDB: any = [];
  userDesc: any = [];

  constructor(
    public dialog: MatDialog,
    private api: APIService,
    private userService: UserService,
    private utils: UtilsService,
    private matSnack: MatSnackBar
  ) {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      description: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(''),
      indicative: new FormControl('57', Validators.required)
    });
  }

  async ngOnInit(): Promise<void> {
    await this.initializeUserData();
  }

  async initializeUserData(): Promise<void> {
    const userPromise = this.userService.getUser();
    const userDataPromise = this.userService.getUserDataOnce();
    await Promise.all([userPromise, userDataPromise]);

    this.userData = this.userService.dataSource;

    this.profileForm.patchValue({
      name: this.userData["name"] || '',
      last_name: this.userData['lastname'] || '',
      email: this.userData['email'] || '',
      telephone: this.userData['phone'] || '',
      description: this.userData['descriptionProfile'] || ''
    });
  }

  async updateUser(): Promise<void> {
    try {
      const { name, last_name, description } = this.profileForm.value;
      await this.userService.updateUser(name, last_name, description).then(() => {
        this.utils.resetComponent();
      });
      this.matSnack.open("✔️ Se han actualizado los datos del usuario.", undefined, { duration: 3000 })
    } catch (error) {
      console.error('Error updating links:', error);
      this.matSnack.open("❌ Hubo un problema, vuelve a intentarlo", undefined, { duration: 3000 })
    }
  }

  handleButtonClick() {
    this.updateUser()
  }
}
