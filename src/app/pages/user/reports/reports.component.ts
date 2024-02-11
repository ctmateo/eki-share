import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService, StateRequest } from 'src/app/API.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  buttonDisabled: boolean = false;
  tabs: { name: string, get: Function }[] = [];
  modifiedTitleReport: string = '';
  result = 0;
  userData: any = [];
  filterOptions: any = ['Formulario', 'Contenido', 'Pagos', 'Multimedia'];
  dataSourceById: any = [];
  tabselected: number = 0;
  stateBtnOpenChat: boolean = true;

  constructor(
    private router: Router,
    private api: APIService,
    private userService: UserService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.initializeUserData();
  }

  async initializeUserData() {
    await this.getUser();
    this.tabsByType();
    this.getReportListByType();
  }

  tabsByType() {
    this.tabs.push(
      {
        "name": "Solicitudes",
        "get": () => this.selectedTab(1)
      },
      {
        "name": "Resueltas",
        "get": () => this.selectedTab(2)
      }
    );
  }

  saveGotoPage(page: string, idReport: any): void {
    this.router.navigate([page, idReport]);
  }

  async getUser() {
    try {
      await this.userService.getUser();
      this.userData = this.userService.dataSource;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }

  onTabSelected(event: any) {
    this.selectedTab(event.index + 1);
  }

  selectedTab(index: number) {
    this.tabselected = index;
    this.getReportListByType();
  }

  async getReportListByType(token?: any) {
    try {
      const response = await this.api.RequestSupportbyUserID(this.userData["userID"]);

      if (this.tabselected === 0) {
        this.stateBtnOpenChat = true;
        const filteredItemsStateRequest = response.items.filter(item => item && (item.stateRequest !== 'SOLVED' && item.stateRequest !== 'UNSOLVED'));
        this.dataSourceById = filteredItemsStateRequest;
      }
      if (this.tabselected === 1) {
        this.stateBtnOpenChat = false;
        const filteredItemsStateRequest = response.items.filter(item => item && (item.stateRequest === 'SOLVED' || item.stateRequest === 'UNSOLVED'));
        this.dataSourceById = filteredItemsStateRequest;
      }
    } catch (error) {
      console.error('Error al obtener la lista de informes:', error);
    }
  }

  titleReportList(titleReport): string {
    switch (titleReport) {
      case 'UNKNOW':
        return 'Desconocido';
      case 'CONTENTCLASS':
        return 'Contenido';
      case 'TRANSACTIONS':
        return 'Suscripción';
      case 'UX':
        return 'Bug';
      default:
        return 'ERROR EN TITÚLO';
    }
  }

  convertData(data): string {
    return this.utils.convertToDateCollaborator(data);
  }

  handleButtonClick(item) {
    this.buttonDisabled = true;
    this.saveGotoPage('/collaborator/chat-reports', item);
  }
}
