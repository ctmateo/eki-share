import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { UtilsService } from 'src/app/services/utils.service';
import { filter } from 'rxjs';
import { Auth } from 'aws-amplify';

const MENU = {
  home: "home",
  catalog: "catalog",
  mycourses: "myCourses",
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements AfterViewInit {
  showFiller = false;
  expanded = false;
  nameBottonPush = "";
  name: string = "";
  email: string = "";
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    private router: Router,
    public apiService: APIService,
    private utilsService: UtilsService,
    public dialog: MatDialog
  ) {

  }

  ngAfterViewInit(): void {
    this.openMenu()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.pressButtonMenu(event.url)
    });
  }


  gotoPage(page: string) {
    this.router.navigateByUrl(page)
  }

  openMenu() {
    this.toggleMenu(true);
  }

  closeMenu() {
    this.toggleMenu(false);
  }

  toggleMenu(state: boolean) {
    this.drawer.toggle(state);
  }


  pressButtonMenu(url) {
    for (var name in MENU) {
      if (url.toLowerCase().includes(name)) {
        this.nameBottonPush = name
      }
    }
  }

  async logOut() {
    await Auth.signOut();
  }
}
