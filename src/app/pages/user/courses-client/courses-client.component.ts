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

  // courses: any = [
  //   { percent: 40, chips: [], hour: 10, class: 6, name: '', descriptionEs: '', imageCourse: '', id: "4de36089-3bbb-4752-a794-73aba84a80ca" },
  // ]

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

      for (const item of responseCourses.items) {
        const { name, descriptionCourse, tags, keyImagePresentation, id, modules } = item?.course!;
        const lengthClasses = modules?.items.length;
        const url = await this.s3Service.getUrlFile(keyImagePresentation);
        const percent = await this.calculateCoursePercent(id);
        const tagsList = await this.translateTagsbyId(tags?.items.map(item => item?.courseByTagsTagId));

        console.log('tags List', tagsList)
        this.courses.push({
          percent: percent,
          chips: tagsList,
          hour: 10,
          class: lengthClasses,
          name: name,
          descriptionEs: descriptionCourse,
          imageCourse: url,
          id: id
        });
      }
    } catch (e) {
      console.error('No es posible traer la información');
    }
  }
  async calculateCoursePercent(courseID: string) {
    try {
      const responseContentCourseId = await this.api.ListProgressionContentbyCourseId(courseID);
      // console.log('Progression Content for course id', responseContentCourseId);
      const responseContent = await this.api.ListProgressionContents();
      console.log('content', responseContent);



      const totalContentsCount = responseContentCourseId.items.length;

      let completedContentsCount = 0;
      for (const item of responseContentCourseId.items) {
        if (item?.contentIscompleted) {
          completedContentsCount++;
        }
      }

      const progressPercent = totalContentsCount > 0 ? (completedContentsCount / totalContentsCount) * 100 : 0;

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
