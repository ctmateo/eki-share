import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CollaboratorComponent } from './pages/admin/collaborator/collaborator.component';
import { MetricsComponent } from './pages/admin/metrics/metrics.component';
import { GroupsComponent } from './pages/admin/groups/groups.component';
import { PathComponent } from './pages/admin/path/path.component';
import { ProfileUserComponent } from './pages/user/profile/profile.component';
import { FlowPathComponent } from './pages/admin/path/flow-path/flow-path.component';
import { DetailGroupComponent } from './pages/admin/groups/detail-group/detail-group.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { ListCatalogueComponent } from './pages/user/catalogue/list-catalogue/list-catalogue.component';
import { HomeComponent } from './pages/user/home/home/home.component';
import { SearchComponent } from './pages/user/search/search/search.component';
import { ProfileConfigComponent } from './pages/user/profile/components/profile-config/profile-config.component';
import { PhotoComponent } from './pages/user/profile/components/photo/photo.component';
import { LinksComponent } from './pages/user/profile/components/links/links.component';
import { AccessibilityComponent } from './pages/user/profile/components/accessibility/accessibility.component';
import { ReportsComponent } from './pages/user/reports/reports.component';
import { PqrsComponent } from './pages/user/pqrs/pqrs.component';
import { ChatReportsComponent } from './pages/user/reports/chat-reports/chat-reports.component';
import { DetailContentComponent } from './pages/user/catalogue/detail-content/detail-content.component';
import { CoursesClientComponent } from './pages/user/courses-client/courses-client.component';

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  {
    path: 'collaborator',
    component: UserComponent,
    children: [
      { path: 'catalogue', component: ListCatalogueComponent, pathMatch: 'full' },
      { path: 'detailCourse', loadChildren: () => import('./pages/user/detail-course/detail-course.module').then(m => m.DetailCourseModule) },
      { path: 'multimedia/:id', component: DetailContentComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      {path: 'mycourses', component: CoursesClientComponent, pathMatch:'full'},
      { path: 'search', component: SearchComponent, pathMatch: 'full' },
      {
        path: 'profile', component: ProfileUserComponent, children: [
          { path: 'profile-config', component: ProfileConfigComponent, pathMatch: 'full' },
          { path: 'photo', component: PhotoComponent, pathMatch: 'full' },
          { path: 'links', component: LinksComponent, pathMatch: 'full' },
          { path: 'accessibility', component: AccessibilityComponent, pathMatch: 'full' },
        ]
      },
      {path: 'pqrs', component: PqrsComponent, pathMatch:'full'},
      {
        path:'reports', component: ReportsComponent, pathMatch:'full'
        
      },
      {path: 'chat-reports/:idReport', component: ChatReportsComponent, pathMatch: "full"}
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'path/:flowCompanyId', component: FlowPathComponent, pathMatch: 'full' },
      { path: 'users', component: CollaboratorComponent, pathMatch: 'full' },
      { path: 'metrics', component: MetricsComponent, pathMatch: 'full' },
      { path: 'teams', component: GroupsComponent, pathMatch: 'full' },
      { path: 'teams/:id', component: DetailGroupComponent, pathMatch: 'full' },
      { path: 'path', component: PathComponent, pathMatch: 'full' },
      { path: 'path/:id', component: FlowPathComponent, pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
