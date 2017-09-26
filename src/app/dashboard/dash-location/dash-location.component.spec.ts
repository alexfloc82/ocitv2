import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLocationComponent } from './dash-location.component';

describe('DashLocationComponent', () => {
  let component: DashLocationComponent;
  let fixture: ComponentFixture<DashLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
