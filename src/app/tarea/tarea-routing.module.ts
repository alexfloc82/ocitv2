import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TareaComponent} from './tarea.component';

const routes: Routes = [
  { path: '',    component: TareaComponent },
 // { path: ':id',    component: ProposalDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareaRoutingModule { }
