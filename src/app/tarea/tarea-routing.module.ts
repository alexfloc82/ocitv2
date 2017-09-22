import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TareaComponent} from './tarea.component';
import {TareaDetailComponent} from '../tarea-detail/tarea-detail.component';
import {TareaFichaComponent} from '../tarea-ficha/tarea-ficha.component';

const routes: Routes = [
  { path: '',    component: TareaComponent },
  { path: ':id',    component: TareaDetailComponent },
  { path: ':id/:idficha',    component: TareaFichaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareaRoutingModule { }
