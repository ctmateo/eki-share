import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatalogueComponent } from './list-catalogue.component';

describe('ListCatalogueComponent', () => {
  let component: ListCatalogueComponent;
  let fixture: ComponentFixture<ListCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatalogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
