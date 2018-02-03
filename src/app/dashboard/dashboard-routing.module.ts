import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard.component';
/*
import {DashGeneralComponent} from './dash-general/dash-general.component';
import {DashLocationComponent} from './dash-location/dash-location.component';
import {DashFormatComponent} from './dash-format/dash-format.component';
import {DashGeneroComponent} from './dash-genero/dash-genero.component';
import {DashDataComponent} from './dash-data/dash-data.component';
*/

const routes: Routes = [
  { path: '',    component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
