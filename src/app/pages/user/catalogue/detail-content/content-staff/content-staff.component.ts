import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SortDirection } from 'aws-amplify';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { CommentsService } from 'src/app/services/comments.service';
import { S3ManagerService } from 'src/app/services/s3-manager.service';


const DEFAULT_PROFILE_IMAGE = "https://eki-public.s3.amazonaws.com/profile.jpg"
@Component({
  selector: 'app-content-staff',
  templateUrl: './content-staff.component.html',
  styleUrls: ['./content-staff.component.sass']
})
export class ContentStaffComponent {

  @Input() description: string | undefined;
  @Input() content: any
  @Input() type: string = ""

  sourceComments: any = []

  formComment: FormGroup;

  constructor(
    private api: APIService, 
    private s3: S3ManagerService,
    private apiComments: CommentsService
    ) {
    this.formComment = new FormGroup({
      comment: new FormControl('', Validators.required)
    })
  }

  async sendComment() {
    try {
      const userDataId = sessionStorage.getItem("userDataId")
      if (userDataId != null) {
        const payload = {
          userDataID: userDataId,
          classVideoID: this.content.id,
          menssages: this.formComment.value['comment']
        }

        await this.api.CreateComments(payload)
        await this.getComments()
      }
    } catch (err) {
      console.error("create comment", err);
    }
    this.formComment.reset()
  }

  enterComent(event) {
    if (event.key === 'Enter') {
      this.sendComment();
    }
  }

  async ngOnChanges(changes: any) {
    this.content = changes.content.currentValue;
    await this.getComments()
  }

  async getComments() {
    try {
      let source = (await this.apiComments.ListCommentsbyClassVideo(this.content.id, undefined, ModelSortDirection.DESC, undefined, 30, undefined)).items
      this.sourceComments = await Promise.all(source.map(async element => {
        if (element != null) {
          return {
            createAt: element.createdAt,
            name: element.userData.user.name,
            time: element.createdAt,
            menssages: element.menssages,
            profilePhoto: await this.s3.getUrlFile(`profile_collaborator/${element.userData.user.id}`)
          }
        }
        return null
      }))
    } catch (err) {
      console.error("get comments", err);
    }
  }

  noImage(event: any) {
    event.target.src = DEFAULT_PROFILE_IMAGE;
  }


}
