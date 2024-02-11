import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTeacherComponent } from './card-teacher.component';

describe('CardTeacherComponent', () => {
  let component: CardTeacherComponent;
  let fixture: ComponentFixture<CardTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
