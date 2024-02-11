import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProfileUserComponent } from './profile.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations:[ProfileUserComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    SharedComponentsModule
  ]
})
export class ProfileModule { }
