import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-suggest-courses',
  templateUrl: './suggest-courses.component.html',
  styleUrls: ['./suggest-courses.component.sass']
})
export class SuggestCoursesComponent {

  courseslIsLoad = false;

  @Input() newCourses: any[] = [] as any[]
  @Input() trendingCourses: any[] = [] as any[]

  newCoursesSources: any = null
  trendingCoursesSources: any = null

  constructor(private s3: S3ManagerService,
    private utils: UtilsService,
    private cdr: ChangeDetectorRef) {
  }

  async ngOnChanges(changes: any) {
    try {
      this.trendingCourses = changes.trendingCourses.currentValue;
      this.trendingCoursesSources = await this.getTrendingCourses()
      this.newCourses = changes.newCourses.currentValue
      this.newCoursesSources = await this.getNewCourses()
    } catch (err) {
      console.error(err);
    }

    this.courseslIsLoad = true
    this.cdr.detectChanges()
  }

  async getNewCourses() {
    try {
      return await Promise.all(this.newCourses.map(async element => {
        return {
          ...element,
          keyImagePresentation: await this.s3.getUrlFile(element.keyImagePresentation)
        }
      })) as any[]
    } catch (err) {
      console.error(err);
      return [] as any[]
    }
  }

  async getTrendingCourses() {
    try {
      return await Promise.all(this.trendingCourses.map(async element => {
        return {
          ...element,
          keyImagePresentation: await this.s3.getUrlFile(element.keyImagePresentation)
        }
      })) as any[]
    } catch (err) {
      console.error(err);
      return [] as any[]
    }
  }

  goToCourse(id) {
    this.utils.goToRouter(`collaborator/detailCourse/course/${id}?type=Course`)
  }
}
