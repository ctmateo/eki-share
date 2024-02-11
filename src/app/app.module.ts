import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { CollaboratorComponent } from './pages/admin/collaborator/collaborator.component';
import { MetricsComponent } from './pages/admin/metrics/metrics.component';
import { GroupsComponent } from './pages/admin/groups/groups.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { PathComponent } from './pages/admin/path/path.component';
import { CreateCollaboratorsComponent } from './pages/admin/collaborator/create-collaborators/create-collaborators.component';
import { FlowPathComponent } from './pages/admin/path/flow-path/flow-path.component';
import { FindCollaboratorComponent } from './pages/admin/path/find-collaborator/find-collaborator.component';
import { AddFlowCompanyComponent } from './pages/admin/path/add-flow-company/add-flow-company.component';
import { DetailGroupComponent } from './pages/admin/groups/detail-group/detail-group.component';
import { AddMenberComponent } from './pages/admin/groups/detail-group/add-menber/add-menber.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './pages/user/home/home/home.component';
import { CarouselComponent } from './pages/user/home/carousel/carousel.component';
import { MyCoursesComponent } from './pages/user/home/my-courses/my-courses.component';
import { MyRoutesComponent } from './pages/user/home/my-routes/my-routes.component';
import { CardTeacherComponent } from './pages/user/home/card-teacher/card-teacher.component';
import { SuggestCoursesComponent } from './pages/user/home/suggest-courses/suggest-courses.component';
import { ListCatalogueComponent } from './pages/user/catalogue/list-catalogue/list-catalogue.component';
import { CardCatalogueComponent } from './pages/user/catalogue/card-catalogue/card-catalogue.component';
import { TicketsComponent } from './pages/user/tickets/tickets.component';
import { ProfileConfigComponent } from './pages/user/profile/components/profile-config/profile-config.component';
import { PhotoComponent } from './pages/user/profile/components/photo/photo.component';
import { LinksComponent } from './pages/user/profile/components/links/links.component';
import { AccessibilityComponent } from './pages/user/profile/components/accessibility/accessibility.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReportsComponent } from './pages/user/reports/reports.component';
import { PqrsModule } from './pages/user/pqrs/pqrs.module';
import { UserService } from './services/user.service';
import { ChatReportsComponent } from './pages/user/reports/chat-reports/chat-reports.component';
import { ReusableButtonComponent } from './shared-components/reusable-button/reusable-button.component';
import { DetailContentComponent } from './pages/user/catalogue/detail-content/detail-content.component';
import { ContentStaffComponent } from './pages/user/catalogue/detail-content/content-staff/content-staff.component';
import { MultimediaComponent } from './pages/user/catalogue/detail-content/multimedia/multimedia.component';
import { DetailRouteComponent } from './pages/user/catalogue/detail-route/detail-route.component';
import { ProfileModule } from './pages/user/profile/profile.module';
import { DateFormatPipe } from './validator/date-format.pipe';
import { CoursesClientModule } from './pages/user/courses-client/courses-client.module';
import { CoursesClientComponent } from './pages/user/courses-client/courses-client.component';
import { PqrsComponent } from './pages/user/pqrs/pqrs.component';
import { ErrorAlertComponent } from './shared-components/dialogs/error-alert/error-alert.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CollaboratorComponent,
    MetricsComponent,
    GroupsComponent,
    ProfileComponent,
    PathComponent,
    CreateCollaboratorsComponent,
    FlowPathComponent,
    FindCollaboratorComponent,
    AddFlowCompanyComponent,
    DetailGroupComponent,
    AddMenberComponent,
    AdminComponent,
    UserComponent,
    HomeComponent,
    CarouselComponent,
    MyCoursesComponent,
    MyRoutesComponent,
    CardTeacherComponent,
    SuggestCoursesComponent,
    ListCatalogueComponent,
    CardCatalogueComponent,
    TicketsComponent,
    ProfileConfigComponent,
    PhotoComponent,
    LinksComponent,
    AccessibilityComponent,
    ReportsComponent,
    PqrsComponent,
    ChatReportsComponent,
    DetailContentComponent,
    ContentStaffComponent,
    MultimediaComponent,
    DetailRouteComponent,
    DateFormatPipe,
    CoursesClientComponent
  ],
  imports: [
    MatSlideToggleModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedComponentsModule,
    AmplifyAuthenticatorModule,
    PqrsModule,
    ProfileModule, 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
