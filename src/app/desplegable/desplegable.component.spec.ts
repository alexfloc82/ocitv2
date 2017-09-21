import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableComponent } from './desplegable.component';

describe('DesplegableComponent', () => {
  let component: DesplegableComponent;
  let fixture: ComponentFixture<DesplegableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
