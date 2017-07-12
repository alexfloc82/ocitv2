import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HollidayRoutingModule } from './holliday-routing.module';
import { HollidayComponent } from './holliday.component';

@NgModule({
  imports: [
    CommonModule,
    HollidayRoutingModule
  ],
  declarations: [HollidayComponent]
})
export class HollidayModule { }
