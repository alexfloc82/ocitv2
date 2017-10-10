import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespCloudComponent } from './desp-cloud.component';

describe('DespCloudComponent', () => {
  let component: DespCloudComponent;
  let fixture: ComponentFixture<DespCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
