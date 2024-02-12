import { Component, OnInit } from '@angular/core';
import { APIService, Available, ListProgresionCourseByUserDataIDQuery } from 'src/app/API.service';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-courses-client',
  templateUrl: './courses-client.component.html',
  styleUrls: ['./courses-client.component.sass']
})
export class CoursesClientComponent implements OnInit {

  tabs = [
    {
      'name': 'En curso'
    }, {
      'name': 'Finalizados'
    }
  ]
  buttonDisabled: boolean = false;
  userData: any;
  courses: any[] = [];
  presignedUrl = '';

  constructor(public utils: UtilsService, private s3Service: S3ManagerService, private api: APIService, private userService: UserService) {

  }
  ngOnInit(): void {
    this.initializeUserData();
  }

  async initializeUserData() {
    await this.userService.getUser();
    await this.getCoursesByUserId();

  }

  async getCoursesByUserId() {
    try {
      const responseCourses = await this.api.ListProgresionCourseByUserDataID(this.userService.dataSource['userDataID']);
      // console.log('courses', responseCourses);
      const coursePromises = responseCourses.items.map(async (item) => {


        const { name, descriptionCourse, tags, keyImagePresentation, id, modules } = item?.course!;

        const lengthClasses = modules?.items.length;

        const urlPromise = this.s3Service.getUrlFile(keyImagePresentation);

        const percentPromise = this.calculateCoursePercent(id, item?.course?.countContentByCourse);

        const tagsListPromise = this.translateTagsbyId(tags?.items.map(item => item?.courseByTagsTagId));

        const [url, percent, tagsList] = await Promise.all([urlPromise, percentPromise, tagsListPromise]);

        return {
          percent: percent,
          chips: tagsList,
          hour: 10,
          class: lengthClasses,
          name: name,
          descriptionEs: descriptionCourse,
          imageCourse: url,
          id: id
        };
      });
      this.courses = await Promise.all(coursePromises);
    } catch (e) {
      console.error('No es posible traer la información');
    }
  }
  async calculateCoursePercent(courseID, totalCourses) {
    try {
      const responseContentCourseId = await this.api.ListProgressionContentbyCourseId(courseID);
      console.log('response', responseContentCourseId)
      const totalContentsCount = totalCourses;
      const completedContentsCount = responseContentCourseId.items.length;

      const progressPercent = totalContentsCount > 0 ? (completedContentsCount / totalCourses) * 100 : 0;

      return progressPercent;
    } catch (e) {
      console.error('No es posible calcular el procentaje con el curso con ID:', courseID);
      throw e;
    }
  }

  async translateTagsbyId(tagIDs: any) {
    try {
      const responseTags = await this.api.ListTags();
      const tagNamesSet = new Set<string>();

      for (const tagID of tagIDs) {
        const tag = responseTags.items.find(item => item?.id === tagID);
        if (tag && tag.name) {
          tagNamesSet.add(tag.name);
        }
      }
      const tagNames = Array.from(tagNamesSet);

      return tagNames;
    } catch (e) {
      console.error('No es posible traducir los identificadores de etiqueta:', e);
      throw e;
    }
  }


  goToCourse = (id: string) => {
    this.utils.goToRouter(`collaborator/detailCourse/course/${id}?type=Course`);
  }

  handleButtonClick() {
    this.utils.goToRouter(`collaborator/catalogue`)
  }

}
