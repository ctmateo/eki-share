import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  showFiller = false;
  expanded = false;
  selected = 0;

  nameUser = "";
  email = "";
  initials = "";

  constructor(
    private utilsService: UtilsService,
    private df: ChangeDetectorRef,
    private router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getUser()
  }

  async getUser() {
    const user = await Auth.currentUserInfo();
    this.initials = `${user.attributes.given_name[0].toUpperCase()}${user.attributes.family_name[0].toUpperCase()}`

  }

  async signOut(): Promise<void> {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('error signing out: ', error);
    }
  }

  gotoPage(page: string) {
    this.router.navigateByUrl(page)
  }
}
