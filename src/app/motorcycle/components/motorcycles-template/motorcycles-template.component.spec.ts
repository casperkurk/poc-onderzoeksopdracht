import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcyclesTemplateComponent } from './motorcycles-template.component';

describe('MotorcyclesTemplateComponent', () => {
  let component: MotorcyclesTemplateComponent;
  let fixture: ComponentFixture<MotorcyclesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorcyclesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcyclesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
