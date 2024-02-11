import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { VideoComponent } from './detail/video/video.component';
import { InfographicComponent } from './detail/infographic/infographic.component';
import { PodcastComponent } from './detail/podcast/podcast.component';
import { ReadingComponent } from './detail/reading/reading.component';
import { TestComponent } from './detail/test/test.component';
import { CapsuleComponent } from './detail/capsule/capsule.component';

const routes: Routes = [
  {path:'course/:id' , component: DetailComponent, 
  children:[
    {path:'video/:id', component: VideoComponent , pathMatch:'full' },
    {path:'infographic', component: InfographicComponent , pathMatch:'full'},
    {path:'podcast', component: PodcastComponent , pathMatch:'full'},
    {path:'reading', component: ReadingComponent , pathMatch:'full'},
    {path:'test', component: TestComponent , pathMatch:'full'},
    {path:'capsule', component: CapsuleComponent , pathMatch:'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailCourseRoutingModule { }
