import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidaysComponent } from './holidays.component';

@NgModule({
  imports: [
    CommonModule,
    HolidaysRoutingModule
  ],
  declarations: [HolidaysComponent]
})
export class HolidaysModule { }
