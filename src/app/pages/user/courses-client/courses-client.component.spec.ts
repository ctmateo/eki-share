import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesClientComponent } from './courses-client.component';

describe('CoursesClientComponent', () => {
  let component: CoursesClientComponent;
  let fixture: ComponentFixture<CoursesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
