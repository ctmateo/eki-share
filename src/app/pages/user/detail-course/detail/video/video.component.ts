import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { APIService } from 'src/app/API.service';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import { ReportComponent } from './report/report.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotfyDestroyService } from 'src/app/services/notfyDestroy.service';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass'],
})
export class VideoComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  noteForm!: FormGroup;
  IdVideo!: string;
  idCourse!: string;
  ContentModuleId!: string;
  time!: any;
  isNewNote = false;
  data: any = {};
  objInfoProgressCont = {};
  isComplete = false;
  currentTime = 0
  @ViewChild('video') miVideo!: ElementRef;
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: APIService,
    private s3: S3ManagerService,
    private matdialog: MatDialog,
    // private destroyComponent: NotfyDestroyService,
    private router: Router
  ) {
    this.activateRoute.params.subscribe((params: Params) => {
      this.IdVideo = params['id'];

      this.idCourse = this.activateRoute.parent?.snapshot.params['id'];

      // getprogresioncourse

      this.getVideo(this.IdVideo);
    });
    console.log(this.IdVideo);
  }
  ngOnInit(): void {
    // this.destroyComponent.onDestroy$
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe(() => {
    //     console.log('Hijo Component destruido');
    //   });
    this.generateNoteForm();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.handleRouteChange();
      });
  }

  async handleRouteChange() {
  
      // Realiza acciones específicas para el cambio de ruta
      console.log('actualizando.........');
      console.log(this.IdVideo);

      console.log(this.miVideo.nativeElement.currentTime);
      let idProgresionContent =
        this.objInfoProgressCont[this.IdVideo]['idProgresionModule'];
      let userId = this.objInfoProgressCont[this.IdVideo]['userDataID'];
      let courseId = this.objInfoProgressCont[this.IdVideo]['courseID'];
      let resultUPdate = this.apiService.UpdateProgressionContent({
        id: idProgresionContent,
        contentIscompleted: true,
        userDataID: userId,
        courseID: courseId,
        videoTimeMs: this.miVideo.nativeElement.currentTime,
      })
      .then( data => console.log(data))
      .catch( error => console.error(error,'error en updateTime') )

    
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destroy , video');
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async getVideo(idVideo) {
    try {
      let infoVideo = await this.apiService.GetClassVideo(idVideo);
      this.ContentModuleId = infoVideo.classVideoContentModuleId || '';
      this.data.url = await this.s3.getUrlFile(
        infoVideo.videoKey720?.replace('public/', '')
      );
   
      this.data.description = infoVideo.description;

      this.data.resources = infoVideo.resources?.items;
      await this.findOrCreateProgresionContent();
      this.currentTime = this.objInfoProgressCont[this.IdVideo].videoTimeMs
      this.miVideo.nativeElement.currentTime = this.currentTime
    } catch (error) {}
  }

  async findOrCreateProgresionContent() {
    try {
      let userId = sessionStorage.getItem('userId') || '';
      let userDataId =
        (await this.apiService.UserDataByUserId(userId)).items[0]?.id || '';

      let listProgresionBydataUserId =
        await this.apiService.ListProgressionContentbyUserDataId(userDataId);
      console.log(listProgresionBydataUserId);

      // si exite items , creamos un objeto de idvideo
      if (listProgresionBydataUserId.items.length) {
        listProgresionBydataUserId.items.forEach((content) => {
          let property = content?.contentModule.classVideo?.id || '';
          this.objInfoProgressCont[property] = {
            idVideo: property,
            idProgresionModule: content?.id,
            contentModuleID: this.ContentModuleId,
            courseID: this.idCourse,
            userDataID: userDataId,
            contentoIsComplete: content?.contentIscompleted,
            videoTimeMs:content?.videoTimeMs
          };
        });

        if (!this.objInfoProgressCont[this.IdVideo]) {
          let createProgresion = await this.apiService.CreateProgressionContent(
            {
              contentModuleID: this.ContentModuleId,
              courseID: this.idCourse,
              userDataID: userDataId,
              contentIscompleted: false,
              videoTimeMs:0
            }
          );
          console.log(createProgresion, 'createprogresion');
          let property = createProgresion.contentModule.classVideo?.id || '';
          this.objInfoProgressCont[property] = {
            idVideo: property,
            idProgresionModule: createProgresion.id,
            contentModuleID: this.ContentModuleId,
            courseID: this.idCourse,
            userDataID: userDataId,
            contentoIsComplete: createProgresion?.contentIscompleted,
          };
        }
      }
      // si no existe nada creamos el primero por primera vez
      if (listProgresionBydataUserId.items.length < 1) {
        let createProgresion = await this.apiService.CreateProgressionContent({
          contentModuleID: this.ContentModuleId,
          courseID: this.idCourse,
          userDataID: userDataId,
          contentIscompleted: false,
          videoTimeMs:0
        });

        let property = createProgresion.contentModule.classVideo?.id || '';
        this.objInfoProgressCont[property] = {
          idVideo: property,
          idProgresionModule: createProgresion.id,
          contentModuleID: this.ContentModuleId,
          courseID: this.idCourse,
          userDataID: userDataId,
          contentoIsComplete: createProgresion?.contentIscompleted,
          videoTimeMs:createProgresion?.videoTimeMs
        };
      }
    } catch (error) {
      console.error(error, 'error en progresion content');
    }
  }
  generateNoteForm() {
    this.noteForm = new FormGroup({
      note: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(8),
      ]),
    });
  }
  generateReport() {
    this.matdialog.open(ReportComponent, {
      width: '600px',
    });
  }
  btnToggleCrateNote(video) {
    this.isNewNote = !this.isNewNote;
    if (this.isNewNote) {
      video.pause();

      if (video.currentTime < 60) {
        this.time = Math.floor(video.currentTime);
      }
      if (video.currentTime >= 60) {
        let operacion = video.currentTime / 60;
        console.log(operacion.toFixed(4));
        // this.time = operacion.toFixed(4)
        this.time = video.currentTime;
      }
    }
  }

  async onTimeUpdate(video) {
    try {
      const MIN_CURRENT = parseFloat(((video.duration * 80) / 100).toFixed(2));
      if (video.currentTime > MIN_CURRENT) {
        if (!this.isComplete) {
          this.isComplete = true;

          let idProgresionContent =
            this.objInfoProgressCont[this.IdVideo]['idProgresionModule'];
          let userId = this.objInfoProgressCont[this.IdVideo]['userDataID'];
          let courseId = this.objInfoProgressCont[this.IdVideo]['courseID'];

          console.log(idProgresionContent);

          let resultUPdate = await this.apiService.UpdateProgressionContent({
            id: idProgresionContent,
            contentIscompleted: true,
            userDataID: userId,
            courseID: courseId,
            videoTimeMs: video.currentTime,
          });
          console.log(resultUPdate);
        }
      }
    } catch (error) {
      console.error(error, 'error en update content');
    }
  }
}
