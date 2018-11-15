import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelkomTemplateComponent } from './welkom-template.component';

describe('WelkomTemplateComponent', () => {
  let component: WelkomTemplateComponent;
  let fixture: ComponentFixture<WelkomTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelkomTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelkomTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
