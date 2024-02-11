import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, CreateProgresionCourseInput } from 'src/app/API.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass'],
})
export class DetailComponent implements OnInit {
  id!: string;
  userId!: string
  course!: any;
  inforCurso: any[] = [];
  lastContenModuleID!: string
  title!: string
  isselected = false
  userDataId!: any
  objInfoProgresContent: any = {}
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: APIService,
    private apiCourse: CoursesService,
    private router: Router
  ) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    console.log(this.activateRoute.children);
    this.main()
  }

  async main() {
    await this.getlistprogresionContent()
    await this.getCourse()
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  async getlistprogresionContent() {
    try {
      let userId = sessionStorage.getItem('userId') || ''
      this.userDataId = (await this.apiService.UserDataByUserId(userId)).items[0]?.id || ''
      let listProgresionBydataUserId =
        await this.apiService.ListProgressionContentbyUserDataId(this.userDataId)
      if (listProgresionBydataUserId.items.length) {
        listProgresionBydataUserId.items.forEach((content) => {
          let property = content?.contentModule.classVideo?.id || '';
          this.objInfoProgresContent[property] = {
            idVideo: property,
            contentIsComplete: content?.contentIscompleted
          };
        });
      }
    } catch (error) {
      console.error(error, 'listprogresion')
    }
  }

  async createOrFindProgresion() {
    try {
      let userId = sessionStorage.getItem('userId') || ''
      this.userDataId = (await this.apiService.UserDataByUserId(userId)).items[0]?.id || ''

      let findProgresioncourde = await this.apiService.ListProgresionCourseByUserDataID(this.userDataId, undefined, undefined, { courseID: { eq: this.id } })

      if (!(findProgresioncourde.items.length > 0)) {

        for (const module of this.inforCurso) {
          this.lastContenModuleID = module.content[0].id
          break

        }
        let inputCreate: CreateProgresionCourseInput = {
          courseID: this.id,
          userDataID: this.userDataId,
          lastContentModuleID: this.lastContenModuleID
        }
        let resultCreate = await this.apiService.CreateProgresionCourse(inputCreate)

      } else {
        this.lastContenModuleID = findProgresioncourde.items[0]?.lastContentModuleID || ''
      }

    } catch (error) {
      console.error(error, 'error en create');

    }
  }

  async getCourse() {
    try {
      this.course = await this.apiCourse.GetCourse(this.id);
      this.title = this.course.name
      let dataCourse = this.course.modules.items

      dataCourse.forEach((modulo, index) => {

        let objmodule = {
          head: `Módulo ${index + 1}`,
          expand: false,
          content: [] as any
        }

        modulo.content.items.forEach((elemento, index) => {
          let objInfoModule: any = {
            typeContent: elemento.typeContent,
            title: `${index + 1}. ${elemento.titleContent}`,
            selected: false,
          }

          if (elemento.typeContent === 'VIDEO' || elemento.typeContent === 'VIDEO_DOCUMENT') objInfoModule.id = elemento.contentModuleClassVideoId
          if (elemento.typeContent === 'TEST') objInfoModule.id = elemento.contentModuleTestId
          if (elemento.typeContent === 'INFOGRAPHIC') objInfoModule.id = elemento.contentModuleInfographicId
          if (elemento.typeContent === 'READING') objInfoModule.id = elemento.contentModuleReadingId
          if (elemento.typeContent === 'PODCAST') objInfoModule.id = elemento.contentModulePodcastId
          if (elemento.typeContent === 'CAPSULE') objInfoModule.id = elemento.contentModuleCapsuleId
          if (this.objInfoProgresContent[objInfoModule.id]) {
            objInfoModule.isComplete = this.objInfoProgresContent[objInfoModule.id]['contentIsComplete'] ? true : false
          }

          objmodule.content.push(objInfoModule)
        })
        this.inforCurso.push(objmodule);
      });
      let idmodule = this.course.modules.items[0].courseModulesId;
      let resultModule = await this.apiService.ModuleByCourseModulesId(
        idmodule
      );

      if (this.activateRoute.children.length > 0) {
        let type
        let id
        let isFirstPath = false

        let urls = this.activateRoute.children[0].snapshot.url
        for (const url of urls) {
          if (!isFirstPath) {
            type = url.path
            isFirstPath = true
            continue
          }
          if (isFirstPath) {
            id = url.path
          }
        }

        this.goToPath(type, id)
      } else {
        await this.createOrFindProgresion()
        this.currentModule()

      }
    } catch (error) {
      console.error("get course error", error);
    }
  }

  goToPath(type: string, idModule: string) {
    this.isselected = true
    this.selectedCourse(idModule)

    type = type === 'VIDEO_DOCUMENT' ? 'VIDEO' : type
    type = type.toLocaleLowerCase()
    this.updateInfoModule()

    if (type === 'video') {
      this.router.navigate(['collaborator', 'detailCourse', 'course', this.id, type, idModule])
    } else {
      this.router.navigateByUrl(`/collaborator/detailCourse/course/${this.id}/${type}`)
    }
  }

  selectedCourse(idModule) {
    this.inforCurso.forEach(curso => {
      curso.content.forEach(content => {
        if (content.id != idModule) {
          content.selected = false
        }
        if (content.id == idModule) {
          content.selected = true
          curso.expand = true
        }
      })
    })
  }

  currentModule() {
    for (const curso of this.inforCurso) {
      for (const content of curso.content) {
        if (content.id === this.lastContenModuleID) {
          this.goToPath(content.typeContent, content.id)
          break
        }
      }
      break
    }
  }

  async updateInfoModule() {
    await this.getlistprogresionContent()

    this.inforCurso.forEach(module => {
      module.content.forEach(content => {
        if (this.objInfoProgresContent[content.id]) {
          content.isComplete = this.objInfoProgresContent[content.id]['contentIsComplete'] ? true : false
        }
      })
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  relaod() { }
}

