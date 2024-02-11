import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeIn } from 'src/app/animation/animation';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

const IMAGE_SIZE = 8 // MB

@Component({
  selector: 'app-photo',
  animations: [fadeIn()],
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.sass']
})
export class PhotoComponent implements OnInit {

  imageFile;
  userData: any = [];
  userID: string = '';
  buttonDisabled: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private s3ManagerService: S3ManagerService,
    private utils: UtilsService,
    private matSnack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeUserData();
  }

  async initializeUserData() {
    await this.getUser();
  }

  async getUser() {
    await this.userService.getUser()
    this.userData = this.userService.dataSource;
    this.userID = this.userData["userID"]
  }

  async addImageFile(event): Promise<void> {
    if (["image/jpg", "image/png", "image/jpeg"].includes(event.type)) {
      this.imageFile = event;
    } else {
      console.error('Document is not supported');
      this.snackBar.open('❌ Error, por favor adjunta una imagen con formato válido (jpg, jpeg, png)', undefined, { duration: 2000 });
    }
  }

  async uploadFile() {
    if (!this.imageFile) {
      console.error('No file has been selected.');
      return;
    }

    if (this.imageFile.size > IMAGE_SIZE * 1024 * 1024) {
      this.snackBar.open(`El archivo es demasiado grande. Por favor, elige un archivo menor a ${IMAGE_SIZE} MB.`);
      this.imageFile = null
      return;
    }

    try {
      const key = `profile_collaborator/${this.userID}`;
      await this.s3ManagerService.uploadFile(this.imageFile, key)
      this.matSnack.open("✔️ Se han actualizado los datos del usuario.", undefined, { duration: 3000 })
      this.utils.resetComponent()
    } catch (error) {
      console.error('Error uploading file:', error);
      this.matSnack.open("❌ Hubo un problema, vuelve a intentarlo", undefined, { duration: 3000 })
    }
  }

}
