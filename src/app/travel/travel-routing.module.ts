import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TravelComponent} from './travel.component';
import {TravelDetailComponent} from './travel-detail.component';

const routes: Routes = [
  { path: '',    component: TravelComponent },
  { path: ':id',    component: TravelDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRoutingModule { }
