import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.sass']
})
export class DetailContentComponent {

  description: string | undefined;
  title: string | undefined;
  id: string | null = null;
  type: string = "";
  content: any = null

  multimediaType = {
    'Class': {
      get: async (id) => await this.getClassVideo(id),
    },
    'Podcast': {
      get: async (id) => await this.getPodcast(id),
    },
    'Capsule': {
      get: async (id) => await this.getCapsule(id),
    },
    'Infographics': {
      get: async (id) => await this.getInfographic(id),
    }
  }

  constructor(
    private route: ActivatedRoute,
    private api: APIService,
    private apiContent: ContentService
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.queryParamMap.get('type') || "";
    try {
      await this.multimediaType[this.type].get(this.id)
    } catch (err) {
      console.error("get class video", err);
    }
  }

  async getClassVideo(id) {
    this.content = await this.apiContent.GetClassVideo(id);
    this.description = this.content.description;
    this.title = this.content.name;
  }

  async getPodcast(id) {
    this.content = await this.api.GetClassPodcast(id);
    console.log(this.content.description)
    this.description = this.content.description;
    this.title = this.content.name;
  }

  async getCapsule(id) {
    this.content = await this.api.GetClassCapsule(id);
    this.description = this.content.description;
    this.title = this.content.name;
  }

  async getInfographic(id) {
    this.content = await this.api.GetClassinfographic(id);
    this.description = this.content.description;
    this.title = this.content.name;
  }
}

