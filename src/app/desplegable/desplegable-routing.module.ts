import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DesplegableComponent} from './desplegable.component'
import { TooltipComponent } from './tooltip/tooltip.component';

const routes: Routes = [
  { path: '',    component: DesplegableComponent },
  { path:'tooltip', component: TooltipComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesplegableRoutingModule { }
