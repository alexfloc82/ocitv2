import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespFileComponent } from './desp-file.component';

describe('DespFileComponent', () => {
  let component: DespFileComponent;
  let fixture: ComponentFixture<DespFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
