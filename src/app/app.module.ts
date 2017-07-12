import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRouteModule} from './app.route.module';
import {CoreModule} from './core/core.module';
import {HomeModule} from './home/home.module';

import { AppComponent } from './app.component';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ProposalModule } from './proposal/proposal.module';
import { SharedModule } from './shared/shared.module';
import { HollidayModule } from './holliday/holliday.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AreaModule } from './area/area.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRouteModule, CoreModule, TimesheetModule, ProposalModule, SharedModule, HollidayModule, 
    AdminModule, UserModule, AreaModule, HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
