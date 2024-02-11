import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-course',
  template: `
    <div class="card-course card-eki" (click)="goToCourse()">
      <mat-chip-listbox class="chip-content">
      <mat-chip-option *ngFor="let tag of course.chips" class="chip">{{ tag }}</mat-chip-option>
      </mat-chip-listbox>
      <p class="title fs-18">{{ course.name }}</p>
      <br />
      <div class="image-course" [ngStyle]="{ 'background-image': 'url(' + course.imageCourse + ')' }"></div>
      <br />
      <mat-progress-bar mode="determinate" [value]="course.percent"></mat-progress-bar>
      <p>{{ course.percent }}% completado</p>
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

  goToCourse() {
    this.courseClick.emit(this.course.id);
  }
}
