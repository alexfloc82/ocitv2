import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaFichaComponent } from './tarea-ficha.component';

describe('TareaFichaComponent', () => {
  let component: TareaFichaComponent;
  let fixture: ComponentFixture<TareaFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
