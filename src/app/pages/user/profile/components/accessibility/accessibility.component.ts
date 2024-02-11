import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService, UpdateUserDataInput } from 'src/app/API.service';
import { fadeIn } from 'src/app/animation/animation';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-accessibility',
  animations: [fadeIn()],
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.sass']
})
export class AccessibilityComponent implements OnInit {

  switchForm: FormGroup;
  userData: any = [];
  switchStates: boolean[] = [false, false, false];
  selectableBoxStates: boolean[] = [false, false, false, false, false, false, false];
  dayHour: any = [];
  daySelected: any = [];
  buttonDisabled: boolean = false;

  constructor(
    private api: APIService,
    private userService: UserService,
    private utils: UtilsService,
    private matSnack: MatSnackBar
  ) {
    this.switchForm = new FormGroup({
      hour: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.initializeUserData();
  }

  toggleSwitch(index: number): void {
    this.switchStates[index] = !this.switchStates[index];
  }
  toggleSelectableBox(index: number): void {
    this.selectableBoxStates[index] = !this.selectableBoxStates[index];
  }

  getDayName(index: number): string {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return days[index] || '';
  }

  getDayNameExpanded(index: number): string {
    const daysExpanded = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    return daysExpanded[index] || '';
  }

  async initializeUserData() {
    await this.getUser();
    const userId = this.userData["userDataID"];
    await this.getUserData(userId);

    this.switchForm.patchValue({
      hour: this.dayHour[1]
    })
  }

  async getUser() {
    await this.userService.getUser();
    this.userData = this.userService.dataSource;
  }

  async getUserData(id) {
    const userData = await this.api.GetUserData(id);
    this.switchStates = [
      userData.allowContentCourses !== null && userData.allowContentCourses !== undefined ? userData.allowContentCourses : false,
      userData.allowMarketing !== null && userData.allowMarketing !== undefined ? userData.allowMarketing : false,
      userData.allowWhatsapp !== null && userData.allowWhatsapp !== undefined ? userData.allowWhatsapp : false,
    ];

    this.dayHour = [
      userData.frequencyDay,
      userData.scheduledTime,
    ];

    const daySelected = this.dayHour[0];
    const daysArray = daySelected.split(',').map(day => day.trim());

    this.selectableBoxStates = [false, false, false, false, false, false, false];

    daysArray.forEach(day => {
      switch (day) {
        case 'MON':
          this.selectableBoxStates[0] = true;
          break;
        case 'TUE':
          this.selectableBoxStates[1] = true;
          break;
        case 'WED':
          this.selectableBoxStates[2] = true;
          break;
        case 'THU':
          this.selectableBoxStates[3] = true;
          break;
        case 'FRI':
          this.selectableBoxStates[4] = true;
          break;
        case 'SAT':
          this.selectableBoxStates[5] = true;
          break;
        case 'SUN':
          this.selectableBoxStates[6] = true;
          break;
      }
    });
  }

  selectedDays(): string {
    const selectedDaysArray: string[] = [];
    for (let i = 0; i < this.selectableBoxStates.length; i++) {
      const isSelected = this.selectableBoxStates[i];
      const dayName = this.getDayNameExpanded(i);

      if (isSelected) {
        selectedDaysArray.push(dayName);
      }
    }
    return this.daySelected = selectedDaysArray.join(', ');
  }

  async updateSwitchDB() {
    try {
      const data: UpdateUserDataInput = {
        id: this.userData["userDataID"],
        allowContentCourses: this.switchStates[0],
        allowMarketing: this.switchStates[1],
        allowWhatsapp: this.switchStates[2],
      };

      if (data.allowWhatsapp) {
        const hourControl = this.switchForm.get('hour')?.value;
        data["frequencyDay"] = this.selectedDays()
        data["scheduledTime"] = hourControl
      }

      await this.api.UpdateUserData(data)
      this.utils.resetComponent()

      this.matSnack.open("✔️ Se han actualizado los datos del usuario.", undefined, { duration: 3000 })
    } catch (error) {
      console.error('Error al actualizar datos en la base de datos', error);
      this.matSnack.open("❌ Hubo un problema, vuelve a intentarlo", undefined, { duration: 3000 })
    }
  }
}
