import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';

@NgModule({
  imports: [
    CommonModule,
    AreaRoutingModule
  ],
  declarations: [AreaComponent]
})
export class AreaModule { }
