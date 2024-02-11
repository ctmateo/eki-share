import { Component, OnInit } from '@angular/core';
import { fadeIn, rigthEnter } from 'src/app/animation/animation';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import { UserService } from 'src/app/services/user.service';

const DEFAULT_PROFILE_IMAGE = "https://eki-public.s3.amazonaws.com/profile.jpg"
@Component({
  selector: 'app-profile',
  animations: [
    fadeIn()
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileUserComponent implements OnInit {
  isloading = true
  userData: any = [];
  photoUser: any = null;
  constructor(private userService: UserService, private s3ManagerService: S3ManagerService) { }

  async ngOnInit() {
    try {
      await this.getUser();
    } catch (err) {
      console.error(err)
    }

    this.isloading = false
  }

  noImage(event: any) {
    event.target.src = DEFAULT_PROFILE_IMAGE;
  }


  async getUser() {
    try {
      await this.userService.getUser();
      this.userData = this.userService.dataSource;
      this.photoUser = await this.s3ManagerService.getUrlFile(`profile_collaborator/${this.userData["userID"]}`);
    } catch (err) {
      console.log("error user service", err)
      console.error(err)
    }

  }
}
