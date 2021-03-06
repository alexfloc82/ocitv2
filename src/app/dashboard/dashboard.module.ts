import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {ChartModule} from 'primeng/primeng';
import {TabViewModule,ButtonModule, DataTableModule,SharedModule} from 'primeng/primeng';

//import { DxChartModule, DxPieChartModule } from 'devextreme-angular';

//import {DashboardService} from './dashboard.service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
/*
import { DashGeneralComponent } from './dash-general/dash-general.component';
import { DashLocationComponent } from './dash-location/dash-location.component';
import { DashFormatComponent } from './dash-format/dash-format.component';
import { DashGeneroComponent } from './dash-genero/dash-genero.component';
import { DashDataComponent } from './dash-data/dash-data.component';
*/

@NgModule({
  imports: [
    CommonModule, ChartModule, FormsModule,
    DashboardRoutingModule, 
    ButtonModule,DataTableModule, SharedModule, TabViewModule
  ],
  declarations: [DashboardComponent],
  providers:[]
})
export class DashboardModule { }
