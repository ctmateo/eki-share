import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { APIService } from 'src/app/API.service';
import { ContentService } from 'src/app/services/content.service';
import { CoursesService } from 'src/app/services/courses.service';
import { S3ManagerService } from 'src/app/services/s3-manager.service';

interface tab {
  label: string;
  name: string;
  get: Function;
}

const LIMIT_SEARCH = 24

@Component({
  selector: 'app-list-catalogue',
  templateUrl: './list-catalogue.component.html',
  styleUrls: ['./list-catalogue.component.sass']
})
export class ListCatalogueComponent implements OnInit, AfterViewInit {
  hasResults = false
  filterForm!: FormGroup;
  categories: any;
  levels: any;
  teachers: any;
  currentAction: tab | undefined;
  result: any;
  lengthData = 0;
  pageSize = LIMIT_SEARCH
  tokens: any = [{ token: "", count: 25 }];
  currentIndex = 0;
  maxLength = -1;
  searchFinish = false
  @ViewChild('pagintor', { static: true })
  paginator!: MatPaginator;

  tabs: tab[] =
    [
      {
        "label": "Rutas",
        "name": "Path",
        "get": (token, event) => this.getRoutes(token, event)
      },
      {
        "label": "Cursos",
        "name": "Course",
        "get": (token, event) => this.getCourses(token, event)
      },
      {
        "label": "Clases",
        "name": "Class",
        "get": (token, event) => this.getClass(token, event)
      },
      {
        "label": "Cápsulas",
        "name": "Capsule",
        "get": (token, event) => this.getCapsule(token, event)
      },
      {
        "label": "Podcast",
        "name": "Podcast",
        "get": (token, event) => this.getPodcast(token, event)
      },
      {
        "label": "Infografías ",
        "name": "Infographics",
        "get": (token, event) => this.getInfographic(token, event)
      }
    ];

  constructor(
    private api: APIService,
    private apiCourses: CoursesService,
    private s3: S3ManagerService,
    private contentService: ContentService
  ) {

  }

  ngAfterViewInit(): void {
    this.changeTag(0);
  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      attribute: new FormControl(''),
      condition: new FormControl(''),
    });
  }

  async changeTag(index) {
    this.hasResults = false
    this.tokens = [{ token: "", count: 25 }]
    this.result = []
    this.searchFinish = false
    this.maxLength = -1
    this.lengthData = 0;
    this.currentIndex = index
    this.currentAction = this.tabs[index]
    try {
      await this.currentAction.get("")
    } catch (err) {
      console.error("get content catalog", err);
    }

    this.hasResults = true
    this.paginator.firstPage()
  }

  async getRoutes(nextToken?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    const query = (await this.api.ListLearningPaths(undefined, LIMIT_SEARCH, nextToken));
    const lenthQuery = query.items.length
    this.addToken(lenthQuery, query.nextToken, event)
    this.result = await Promise.all(query.items.map((async element => {
      return {
        id: element?.id,
        title: element?.name,
        description: element?.descriptionPath,
        image: await this.s3.getUrlFile(element?.keyImagePresentation),
        count: element?.courseFromPath?.items.length,
        counType: "Cursos",
        tags: element?.tags?.items
      };
    })));
  }

  async getCourses(nextToken?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    const query = (await this.apiCourses.ListCourses(undefined, LIMIT_SEARCH, nextToken));
    const lenthQuery = query.items.length
    this.addToken(lenthQuery, query.nextToken, event)
    this.result = await Promise.all(query.items.map((async element => {
      return {
        id: element?.id,
        title: element?.name,
        description: element?.descriptionCourse,
        image: await this.s3.getUrlFile(element?.keyImagePresentation),
        count: element?.modules?.items.length,
        counType: "Modulos",
        tags: element?.tags?.items
      };
    })));
  }

  async getClass(nextToken?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    const query = (await this.contentService.ListClassVideos(undefined, LIMIT_SEARCH, nextToken));
    const lenthQuery = query.items.length
    this.addToken(lenthQuery, query.nextToken, event)
    this.result = await Promise.all(query.items.map((async element => {
      return {
        id: element?.id,
        contentId: element?.classVideoContentModuleId,
        title: element?.name,
        description: element?.description,
      };
    })));
  }

  async getPodcast(nextToken?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    const query = (await this.contentService.ListClassPodcasts(undefined, LIMIT_SEARCH, nextToken));
    const lenthQuery = query.items.length
    this.addToken(lenthQuery, query.nextToken, event)
    this.result = await Promise.all(query.items.map((async element => {
      return {
        id: element?.id,
        contentId: element?.classActivityContentModuleId,
        title: element?.name,
        description: element?.description,
      };
    })));
  }

  async getInfographic(nextToken?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    const query = (await this.contentService.ListClassinfographics(undefined, LIMIT_SEARCH, nextToken));
    const lenthQuery = query.items.length
    this.addToken(lenthQuery, query.nextToken, event)
    this.result = await Promise.all(query.items.map((async element => {
      return {
        id: element?.id,
        contentId: element?.contentModuleId,
        title: element?.name,
        description: element?.description,
        image: await this.s3.getUrlFile(element?.keyImage),
      };
    })));
  }

  async getCapsule(nextToken?, event = { previousPageIndex: -1, pageIndex: 0, pageSize: 0, length: 0 }) {
    const query = (await this.api.ListClassCapsules(undefined, LIMIT_SEARCH, nextToken));
    const lenthQuery = query.items.length
    this.addToken(lenthQuery, query.nextToken, event)
    this.result = await Promise.all(query.items.map((async element => {
      return {
        id: element?.id,
        contentId: element?.classCapsuleID,
        title: element?.name,
        description: element?.description,
        count: element?.videoTime,
        counType: "Tiempo"
      };
    })));
  }


  async pageChange(event) {
    this.result = []
    this.currentAction = this.tabs[this.currentIndex]
    try {
      await this.currentAction.get(this.tokens[event.pageIndex].token, event)
    } catch (err) {
      console.error("get content catalog", err);
    }
  }

  addToken(lenthQuery, nextToken, event) {
    if (nextToken == null) {
      this.searchFinish = true
      this.lengthData = lenthQuery + ((this.tokens.length - 1) * LIMIT_SEARCH)
    }

    if (!this.searchFinish && this.isLookingForward(event)) {
      const token = { count: lenthQuery, token: nextToken }
      this.tokens.push(token)
      this.lengthData = ((this.tokens.length - 1) * LIMIT_SEARCH) + 1
      this.maxLength = event.pageIndex
    }
  }

  isLookingForward(event) {
    const isForward = event.previousPageIndex < event.pageIndex && (event.pageIndex - this.maxLength === 1)
    return isForward
  }
}
