import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDataComponent } from './dash-data.component';

describe('DashDataComponent', () => {
  let component: DashDataComponent;
  let fixture: ComponentFixture<DashDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
