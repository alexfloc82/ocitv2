import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TareaRoutingModule } from './tarea-routing.module';
import { TareaComponent } from './tarea.component';
import { TareaDetailComponent } from '../tarea-detail/tarea-detail.component';
import { TareaFichaComponent } from '../tarea-ficha/tarea-ficha.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    TareaRoutingModule
  ],
  declarations: [TareaComponent, TareaDetailComponent, TareaFichaComponent]
})
export class TareaModule { }
