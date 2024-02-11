import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { PqrsComponent } from './pqrs.component';
import { ReusableButtonComponent } from 'src/app/shared-components/reusable-button/reusable-button.component';



@NgModule({
  declarations: [],
  imports: [
    SharedComponentsModule,
    CommonModule
  ],
  exports: [
  ]
})
export class PqrsModule { }
