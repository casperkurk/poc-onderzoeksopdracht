import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsTemplateComponent } from './cars-template.component';

describe('CarsTemplateComponent', () => {
  let component: CarsTemplateComponent;
  let fixture: ComponentFixture<CarsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
