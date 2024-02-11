import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class SearchModule { }
