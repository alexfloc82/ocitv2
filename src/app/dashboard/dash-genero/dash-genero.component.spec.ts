import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGeneroComponent } from './dash-genero.component';

describe('DashGeneroComponent', () => {
  let component: DashGeneroComponent;
  let fixture: ComponentFixture<DashGeneroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashGeneroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
