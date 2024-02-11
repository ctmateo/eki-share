import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { APIService, CreateRequestSupportInput, ReportSupportType, StateRequest } from 'src/app/API.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.sass']
})
export class ErrorAlertComponent implements OnInit {
  errorForm: FormGroup;
  selectedBoxIndex: number = -1;
  boxIs = '';
  buttonDisabled: boolean = true;

  constructor(
    private router: Router,
    private utils: UtilsService,
    private api: APIService,
    private userService: UserService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.errorForm = new FormGroup({
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.userService.getUser();
    this.errorForm.valueChanges.subscribe(() => {
      this.validateDialog()
    })

  }

  selectableBoxes = [
    { id: 1, label: 'Contenido', icon: ['fas', 'book'] as IconProp, selected: false },
    { id: 2, label: 'Pantalla', icon: ['fas', 'display'] as IconProp, selected: false },
    { id: 3, label: 'Pagos', icon: ['fas', 'money-bill-wave'] as IconProp, selected: false },
    { id: 4, label: 'Otro', icon: ['fas', 'list'] as IconProp, selected: false }
  ];

  onBoxClick(clickedIndex: number): void {
    this.selectableBoxes.forEach((box, index) => {
      box.selected = index === clickedIndex;
    });

    this.selectedBoxIndex = clickedIndex;
  }

  selectedBoxIs(): string {
    switch (this.selectedBoxIndex) {
      case 0:
        this.boxIs = 'CONTENTCLASS';
        break;
      case 1:
        this.boxIs = 'UX';
        break;
      case 2:
        this.boxIs = 'TRANSACTIONS';
        break;
      case 3:
        this.boxIs = 'UNKNOW';
        break;
      default:
        this.boxIs = 'UNKNOW';
        break;
    }
    return this.boxIs;
  }

  async sendReport(): Promise<void> {
    try {
      const userId = this.userService.dataSource['userID'];

      if (!userId) {
        console.error('El ID del usuario es nulo o indefinido.');
        return;
      }

      const data: CreateRequestSupportInput = {
        userID: userId,
        reportSupportType: this.selectedBoxIs() as ReportSupportType,
        originURL: this.utils.giveLinkCurrent(),
        requestMessages: this.errorForm.value['description'],
        stateRequest: StateRequest.STARTING
      };

      const result = await this.api.CreateRequestSupport(data);
    } catch (error) {
      console.error('Error al crear la solicitud de soporte:', error);
    } finally {
      this.snack.open('✔️ El reporte ha sido enviado correctamente.',undefined,{duration: 3000})
      this.dialog.closeAll()
    }
  }

  validateDialog() {
    const validText = this.errorForm.value['description']
    const boxSelected = this.selectedBoxIndex
    if (validText.trim() && boxSelected != -1) {
      this.buttonDisabled = false;
    }else{
      this.buttonDisabled = true;
    }
  }

  handleButtonClick() {
    this.sendReport()
  }
}
