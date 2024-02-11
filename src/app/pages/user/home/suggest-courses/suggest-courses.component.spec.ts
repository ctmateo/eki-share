import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestCoursesComponent } from './suggest-courses.component';

describe('SuggestCoursesComponent', () => {
  let component: SuggestCoursesComponent;
  let fixture: ComponentFixture<SuggestCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
