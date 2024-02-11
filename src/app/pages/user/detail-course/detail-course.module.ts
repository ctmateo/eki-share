import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailCourseRoutingModule } from './detail-course-routing.module';
import { DetailComponent } from './detail/detail.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { TestComponent } from './detail/test/test.component';
import { InfographicComponent } from './detail/infographic/infographic.component';
import { ReadingComponent } from './detail/reading/reading.component';
import { PodcastComponent } from './detail/podcast/podcast.component';
import { CapsuleComponent } from './detail/capsule/capsule.component';
import { ReportComponent } from './detail/video/report/report.component';
import { VideoComponent } from './detail/video/video.component';


@NgModule({
  declarations: [
    DetailComponent,
    VideoComponent,
    TestComponent,
    InfographicComponent,
    ReadingComponent,
    PodcastComponent,
    CapsuleComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    DetailCourseRoutingModule,
    SharedComponentsModule
  ]
})
export class DetailCourseModule { }
