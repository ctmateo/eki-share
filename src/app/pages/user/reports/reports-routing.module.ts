import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatReportsComponent } from './chat-reports/chat-reports.component';
import { ReportsComponent } from './reports.component';

const routes:  Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { path: 'chat-reports', component: ChatReportsComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
