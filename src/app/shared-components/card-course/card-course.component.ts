import { Component, Input, Output, EventEmitter } from '@angular/core';
const DEFAULT_PROFILE_IMAGE = "https://eki-public.s3.amazonaws.com/no_data.jpg"
@Component({
  selector: 'app-card-course',
  template: `
    <div class="card-course card-eki" (click)="goToCourse()">
      <mat-chip-listbox class="chip-content">
      <mat-chip-option *ngFor="let tag of course.chips" class="chip">{{ tag }}</mat-chip-option>
      </mat-chip-listbox>
      <div class="course-name">
        {{ course.name.length > MAX_LENGHT ? course.name.substring(0, MAX_LENGHT) + '...' : course.name }}
      </div>
      <div class="image-course">
      <img [src]="course.imageCourse" loading="lazy" alt="Course" (error)="noImage($event)">
      </div>
      <br />
      <mat-progress-bar mode="determinate" [value]="course.percent"></mat-progress-bar>

      <p>{{ Math.round(course.percent) }}% completado</p>
      <div class="row f-between">
        <p><span class="text-highligth">{{ course.class }} clases</span></p>
        <p><span class="text-highligth">{{ course.hour }} horas</span></p>
      </div>
    </div>
  `,
  styleUrls: ['./card-course.component.sass']
})


export class CardCourseComponent {
  @Input() course: any;
  @Output() courseClick: EventEmitter<number> = new EventEmitter<number>();
  MAX_LENGHT: number = 24;
  Math = Math


  noImage(event: any) {
    event.target.src = DEFAULT_PROFILE_IMAGE;
  }


  goToCourse() {
    this.courseClick.emit(this.course.id);
  }
}
