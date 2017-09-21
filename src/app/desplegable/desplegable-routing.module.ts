import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DesplegableComponent} from './desplegable.component'

const routes: Routes = [
  { path: '',    component: DesplegableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesplegableRoutingModule { }
