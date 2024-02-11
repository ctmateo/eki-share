import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService } from 'src/app/API.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements AfterViewInit {

  showFiller = false;
  expanded = false;
  nameBottonPush = "";
  name: string = "";
  email: string = "";
  companyID: string | undefined;
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    private router: Router,
    public apiService: APIService,
    private utilsService: UtilsService,
    public dialog: MatDialog
  ) {
    this.companyID = sessionStorage.getItem("companyId") || "";
  }

  ngAfterViewInit(): void {
    this.openMenu()
  }

  gotoPage(page: string) {
    console.log("Change page")
    console.log(page)
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

  async logOut() {
    await Auth.signOut();
  }

}
