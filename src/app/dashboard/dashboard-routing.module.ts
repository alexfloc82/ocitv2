import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {DashGeneralComponent} from './dash-general/dash-general.component';
import {DashLocationComponent} from './dash-location/dash-location.component';
import {DashFormatComponent} from './dash-format/dash-format.component';
import {DashGeneroComponent} from './dash-genero/dash-genero.component';

const routes: Routes = [
  { path: '',    component: DashboardComponent,
  children: [
    {path: '',    component: DashGeneralComponent},
    {path: 'General',    component: DashGeneralComponent},
    {path: 'Format',    component: DashFormatComponent},
    {path: 'Genero',    component: DashGeneroComponent},
    {path: 'Location',    component: DashLocationComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
