import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenberComponent } from './add-menber.component';

describe('AddMenberComponent', () => {
  let component: AddMenberComponent;
  let fixture: ComponentFixture<AddMenberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMenberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
