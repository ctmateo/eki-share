import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  listCourses: any[] = []
  trendingCourses: any[] = []
  newCourses: any[] = []
  brandCourses: any[] = []
  loadCourses = false;

  constructor(
    private api: APIService,
    private apiCourse: CoursesService) {

  }

  async ngOnInit() {
    try {
      this.listCourses = await this.getCourses()
      this.getbrandCourses(this.listCourses)
      this.getTrendingCourses(this.listCourses)
      this.getNewCourses(this.listCourses)
    } catch (err) {
      console.error(err)
    }

    this.loadCourses = true;
  } 


  async getCourses() {
    try {
      return (await this.apiCourse.ListCourses(undefined, 24, undefined)).items as any[]
    } catch (err) {
      console.log(err)
      return [] as any[]
    }
  }

  getNewCourses(courses) {
    this.newCourses = courses
      .sort((a: any, b: any) => a["createdAt"] - b["createdAt"])
      .slice(0, 6)
  }

  getTrendingCourses(courses) {
    this.trendingCourses = courses.slice(-6)
  }

  getbrandCourses(courses) {
    this.brandCourses = courses.slice(0, 3)
  }

}
