import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {DashGeneralComponent} from './dash-general/dash-general.component';
import {DashLocationComponent} from './dash-location/dash-location.component';

const routes: Routes = [
  { path: '',    component: DashboardComponent, 
  children: [
    {path: 'General',    component: DashGeneralComponent},
    {path: 'Location',    component: DashLocationComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
