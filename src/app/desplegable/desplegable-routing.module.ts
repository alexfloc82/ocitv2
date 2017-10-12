import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DesplegableComponent} from './desplegable.component'
import { TooltipComponent } from './tooltip/tooltip.component';
import { DespAdminComponent } from './desp-admin/desp-admin.component';
import { DespCloudComponent } from './desp-cloud/desp-cloud.component';
import { DespFileComponent } from './desp-file/desp-file.component';

const routes: Routes = [
  { path: '',    component: DespAdminComponent, children:[
    { path:'', component:DesplegableComponent},
    { path:'etiquetas', component:DesplegableComponent},
    { path:'tooltip', component: TooltipComponent},
    { path:'cloud', component: DespCloudComponent},
    { path:'file', component: DespFileComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesplegableRoutingModule { }
