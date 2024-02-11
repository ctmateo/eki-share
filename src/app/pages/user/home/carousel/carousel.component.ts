import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent {

  carouselIsLoad = false

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 200,
    autoWidth: true,
    autoHeight: true,
    margin: 25,
    center: true,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      800: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    },
  };


  @Input() courses: any = []
  sourcesCourses: any = null


  constructor(private s3: S3ManagerService,
    private utils: UtilsService,
    private cdr: ChangeDetectorRef) {
  }
  
  async ngOnChanges(changes: any) {
    this.courses = changes.courses.currentValue;
    this.sourcesCourses = await Promise.all(this.courses.map(async element => {
      return {
        ...element,
        keyImagePresentation: await this.s3.getUrlFile(element.keyImagePresentation)
      }
    }))
    this.carouselIsLoad = true
    this.cdr.detectChanges();
  }

  goToCourse(id) {
    this.utils.goToRouter(`collaborator/detailCourse/course/${id}?type=Course`)
  }
}
