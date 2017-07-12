import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HollidayComponent } from './holliday.component';

describe('HollidayComponent', () => {
  let component: HollidayComponent;
  let fixture: ComponentFixture<HollidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HollidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HollidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
