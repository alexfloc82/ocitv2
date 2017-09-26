import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashGeneralComponent } from './dash-general/dash-general.component';
import { DashLocationComponent } from './dash-location/dash-location.component';
import {DashboardService} from './dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, DashGeneralComponent, DashLocationComponent],
  providers:[DashboardService]
})
export class DashboardModule { }
