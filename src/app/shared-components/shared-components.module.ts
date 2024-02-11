import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionPanel } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAlertComponent } from './dialogs/dialog-alert/dialog-alert.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatStepperModule } from '@angular/material/stepper';
import { BackButtonComponent } from './back-button/back-button.component';
import { CreateTeamComponent } from '../pages/admin/groups/create-team/create-team.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { ListCatalogueComponent } from '../pages/user/catalogue/list-catalogue/list-catalogue.component';
import { AddFileComponent } from './add-file/add-file.component';
import { ErrorAlertComponent } from './dialogs/error-alert/error-alert.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CardCourseComponent } from './card-course/card-course.component';
import { ReusableButtonComponent } from './reusable-button/reusable-button.component';


@NgModule({
  declarations: [
    DialogAlertComponent,
    BackButtonComponent,
    CreateTeamComponent,
    AddFileComponent,
    ErrorAlertComponent,
    CardCourseComponent,
    ReusableButtonComponent
  ],
  imports: [
    NgxSkeletonLoaderModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatStepperModule,
    CarouselModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatBottomSheetModule,
    DragDropModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    BarRatingModule
  ],
  exports: [
    NgxSkeletonLoaderModule,
    MatExpansionModule,
    MatExpansionPanel,
    AddFileComponent,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BarRatingModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTableModule,
    DragDropModule,
    MatTabsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FontAwesomeModule,
    CarouselModule,
    BackButtonComponent,
    CardCourseComponent,
    ReusableButtonComponent
  ]
})
export class SharedComponentsModule { }
