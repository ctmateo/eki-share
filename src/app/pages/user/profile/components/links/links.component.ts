// links.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from 'src/app/API.service';
import { fadeIn } from 'src/app/animation/animation';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-links',
  animations: [fadeIn()],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.sass']
})
export class LinksComponent implements OnInit {

  linksData: any = [];
  userData: any = [];
  linksForm: FormGroup;
  buttonDisabled: boolean = false;

  constructor(
    private userService: UserService,
    private api: APIService,
    private matSnack: MatSnackBar,
    private utils: UtilsService,
  ) {
    this.linksForm = new FormGroup({
      webpage: new FormControl(''),
      twitter: new FormControl(''),
      linkedin: new FormControl(''),
      youtube: new FormControl(''),
    })
  }

  async ngOnInit(): Promise<void> {
    await this.initializeUserData();
  }

  async initializeUserData(): Promise<void> {
    try {
      await this.getUser();
      await this.getUserData(this.userData["userDataID"]);

      this.linksForm.patchValue({
        webpage: this.linksData[0],
        twitter: this.linksData[1],
        linkedin: this.linksData[2],
        youtube: this.linksData[3]
      });
    } catch (error) {
      console.error('Error initializing user data:', error);
    }
  }

  async getUser(): Promise<void> {
    await this.userService.getUser();
    this.userData = this.userService.dataSource;
  }

  async getUserData(id): Promise<void> {
    try {
      const userData = await this.api.GetUserData(id);
      this.linksData = [
        userData.webpage,
        userData.twitter,
        userData.linkedin,
        userData.youtube,
      ];
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  }

  async updateLinks(): Promise<void> {
    try {
      const { webpage, twitter, linkedin, youtube } = this.linksForm.value;
      await this.userService.updateLinksData(webpage, linkedin, twitter, youtube)
      this.matSnack.open("✔️ Se han actualizado los datos del usuario.", undefined, { duration: 3000 })
      this.utils.resetComponent()
    } catch (error) {
      console.error('Error updating links:', error);
      this.matSnack.open("❌ Hubo un problema, vuelve a intentarlo", undefined, { duration: 3000 })
    }
  }

}
