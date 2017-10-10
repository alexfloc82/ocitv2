import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespAdminComponent } from './desp-admin.component';

describe('DespAdminComponent', () => {
  let component: DespAdminComponent;
  let fixture: ComponentFixture<DespAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
