import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { S3ManagerService } from 'src/app/services/s3-manager.service';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.sass']
})
export class MultimediaComponent {
  @Input() content: any
  @Input() type: string = ""
  loadingAudio = true;

  multimedia: any = {
    video: "",
    audio: "",
    image: ""
  }

  //Audio media
  @ViewChild('waveform') waveFormEl!: ElementRef<any>;
  private waveform!: WaveSurfer;
  isPlaying = false;

  multimediaType = {
    'Class': {
      get: () => this.getClassVideo(),
    },
    'Podcast': {
      get: () => this.getPodcast(),
    },
    'Capsule': {
      get: () => this.getCapsule(),
    },
    'Infographics': {
      get: () => this.getInfographic(),
    }
  }

  constructor(private s3: S3ManagerService) {
  }

  ngOnChanges(changes: any) {
    this.content = changes.content.currentValue;
    this.multimediaType[this.type].get()
  }

  async getClassVideo() {
    if (this.content != null) {
      this.multimedia.video = await this.s3.getUrlFile(this.content.videoKey720, "video/mp4")
    }
  }

  async getPodcast() {
    if (this.content != null) {
      this.multimedia.audio = await this.s3.getUrlFile(this.content.audioKey, "audio/mp3")
      this.waveform = WaveSurfer.create({
        container: this.waveFormEl.nativeElement,
        url: this.multimedia.audio,
        waveColor: 'white',
        progressColor: '#2b252f',
        barWidth: 2,
        barRadius: 2,
        barGap: 2
      })
      this.playEvents()
    }
  }

  playEvents() {
    this.waveform.once('interaction', () => {
      this.waveform.play();
    })

    this.waveform.on('loading', (percent) => {
      this.loadingAudio = percent == 100 ? false : true;
    })

    this.waveform.on('play', () => {
      this.isPlaying = true;
    })

    this.waveform.on('pause', () => {
      this.isPlaying = false;
    })
  }

  async getCapsule() {
    if (this.content != null) {
      this.multimedia.video = await this.s3.getUrlFile(this.content.videoKey480, "video/mp4")
    }
  }

  async getInfographic() {
    if (this.content != null) {
      this.multimedia.image = await this.s3.getUrlFile(this.content.keyImage, "image/jpg")
    }
  }


  play() {
    this.waveform.play();
  }

  stop() {
    this.waveform.stop();
  }

  pause() {
    this.waveform.pause()
  }
}
