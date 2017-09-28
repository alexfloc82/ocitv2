import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashGeneralComponent } from './dash-general/dash-general.component';
import { DashLocationComponent } from './dash-location/dash-location.component';
import {DashboardService} from './dashboard.service';
import {ChartModule} from 'primeng/primeng';
import {TabViewModule,ButtonModule, DataTableModule,SharedModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,ChartModule,FormsModule,
    DashboardRoutingModule, 
    ButtonModule,DataTableModule, SharedModule, TabViewModule
  ],
  declarations: [DashboardComponent, DashGeneralComponent, DashLocationComponent],
  providers:[DashboardService]
})
export class DashboardModule { }
