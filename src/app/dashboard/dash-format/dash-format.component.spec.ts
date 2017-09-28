import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFormatComponent } from './dash-format.component';

describe('DashFormatComponent', () => {
  let component: DashFormatComponent;
  let fixture: ComponentFixture<DashFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
