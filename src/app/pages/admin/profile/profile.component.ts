import { Component, ElementRef, ViewChild } from '@angular/core';
import { Storage } from 'aws-amplify';
import { APIService } from 'src/app/API.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import { DialogAlertComponent } from 'src/app/shared-components/dialogs/dialog-alert/dialog-alert.component';
import { MatDialog } from '@angular/material/dialog';

interface Selector {
  value: string;
  viewValue: string;
}

interface companyInput {
  controlDocumentNumber: string;
  controlLegalDocumentType: string;
  controlLegalName: string;
  controlLegalSurname: string;
  controlNITCompany: string;
  controlNameCompany: string;
  controlPhoneCompany: string;
  controlSector: string;
}

const TIME_SNACK = 4

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  company: any
  listEconomicSector: Selector[] = []
  logo: any
  hasFormCompanyChanges = false
  idBussines: any
  companyForm!: FormGroup
  initialCompany: any = {}

  documentsType: Selector[] = [
    { value: 'CC', viewValue: 'Cédula de identidad' },
    { value: 'CE', viewValue: 'Cédula de extranjeria' },
    { value: 'PP', viewValue: 'Pasaporte' },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private api: APIService,
    public utils: UtilsService,
    public dialog: MatDialog,
    private s3: S3ManagerService
  ) {

  }

  ngOnInit() {
    this.getIndustry()
    this.getCompany()
  }

  async getCompany() {
    const userID = sessionStorage.getItem("userId") || ""
    const companyId = sessionStorage.getItem("companyId") || "";
    
    this.api.GetCompanyData(companyId).then(async (data) => {
      this.company = data

      if (this.company.logoCompany == null || this.company.logoCompany == "") {
        this.logo = "https://eki-public.s3.amazonaws.com/no_data.jpg"
      } else {
        this.logo = await Storage.get(this.company.logoCompany);
      }

      this.companyForm = new FormGroup({
        controlSector: new FormControl(this.company.economicSectorID, Validators.required),
        controlDocumentNumber: new FormControl(this.company.legalDocumentNumber, Validators.required),
        controlLegalDocumentType: new FormControl(this.company.legalDocument, Validators.required),
        controlLegalSurname: new FormControl(this.company.legalSurname, Validators.required),
        controlLegalName: new FormControl(this.company.legalName, Validators.required),
        controlPhoneCompany: new FormControl(this.company.user.phone, Validators.required),
        controlNITCompany: new FormControl(this.company.nit, [Validators.required, Validators.pattern(this.utils.validatorRegex('nit'))]),
        controlNameCompany: new FormControl(this.company.nameCompany, Validators.required),
      })

      this.initialCompany = this.companyForm.value as companyInput
      this.companyForm.valueChanges.subscribe(changes => {
        if (this.utils.areObjectsEqual(this.initialCompany, changes as companyInput)) {
          this.hasFormCompanyChanges = false
        } else {
          this.hasFormCompanyChanges = true
        }
      });
    })
  }

  async getIndustry() {
    const economicSector = await (await this.api.ListClassifiersByCategory("economicSector")).items
    const sortEconomicSector = this.utils.sortArray(economicSector, "name")
    sortEconomicSector.forEach(element => {
      const item = {
        value: element.id,
        viewValue: element.name
      }
      this.listEconomicSector.push(item)
    });
  }

  async updateCompany() {
    let messageRespond = ""
    const payloadCompany = {
      id: this.company.id,
      nameCompany: this.companyForm.value.controlNameCompany,
      nit: this.companyForm.value.controlNITCompany,
      legalName: this.companyForm.value.controlNameSurname,
      legalSurname: this.companyForm.value.controlLegalSurname,
      legalDocument: this.companyForm.value.controlLegalDocumentType,
      legalDocumentNumber: this.companyForm.value.controlDocumentNumber,
      economicSectorID: this.companyForm.value.controlSector,
    };
    const payloadUser = {
      id: this.company.userID,
      phone: this.companyForm.value.controlPhoneCompany,
    }

    try {
      await this.api.UpdateCompanyData(payloadCompany);
      if (this.companyForm.value.controlPhoneCompany != this.initialCompany.controlPhoneCompany) {
        await this.api.UpdateUser(payloadUser);
      }
    } catch (err) {
      console.error("Error update company", err)
      messageRespond = "❌ Hubo un problema al intentar actualizar la información. Por favor, vuelve a intentarlo."
    } finally {
      messageRespond = "✔️ Los datos de la empresa han sido modificados."
    }

    this.openSnackBar(messageRespond)
  }

  async removeImageCompany() {
    try {
      const payloadCompany = {
        id: this.company.id,
        logoCompany: null
      }
      await this.api.UpdateCompanyData(payloadCompany);
    } catch (err) {
      console.error(err)
      this.openSnackBar("❌ Hubo un problema al intentar eliminar el logo. Por favor, vuelve a intentarlo.")
      return
    }

    this.openSnackBar("✔️ Se ha eliminado el logo")
    this.logo = "https://eki-public.s3.amazonaws.com/no_data.jpg"
  }

  async updateImageCompany(file) {
    try {
      const payloadCompany = {
        id: this.company.id,
        logoCompany: file
      }
      await this.api.UpdateCompanyData(payloadCompany);
    } catch (err) {
      console.error(err)
      this.openSnackBar("❌ Hubo un problema al intentar actualizar la información. Por favor, vuelve a intentarlo.")
      return
    }
    this.openSnackBar("✔️ Se ha subido un nuevo logo")
    this.logo = await Storage.get(file);
  }

  openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.duration = TIME_SNACK * 1000;
    this.snackBar.open(message, undefined, config);
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: any): Promise<void> {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileSizeInKB = selectedFile.size / 1024;
      if (fileSizeInKB > 60) {
        this.openSnackBar("❌ ¡Error! El archivo excede los 60 KB permitidos.")
        return;
      }

      try {
        const imageKey = await this.s3.uploadFile(selectedFile, `company/${this.company.id}.jpg`)
        this.updateImageCompany(imageKey)
      } catch (err) {
        console.error(err)
        this.openSnackBar("❌ Hubo un problema al intentar actualizar la información. Por favor, vuelve a intentarlo.")
        return;
      }
    }
  }

  requestIncreseSubscriptors() {
    this.dialog.open(DialogAlertComponent,
      {
        data: {
          message: "Para solicitar un incremento en los límites de su cuenta, le invitamos a enviar un correo electrónico a la siguiente dirección: <br> <strong>comunidad.educativa@eki.com.co.</strong> <br> Estaremos encantados de ayudarle con su solicitud",
          title: "Límite de Suscriptores"
        },
        width: "480px"
      })
  }

}
