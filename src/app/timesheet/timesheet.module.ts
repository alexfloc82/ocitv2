import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';

@NgModule({
  imports: [
    CommonModule,
    TimesheetRoutingModule
  ],
  declarations: [TimesheetComponent]
})
export class TimesheetModule { }
