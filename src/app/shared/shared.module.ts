import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {RolePipe} from './role.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [RolePipe],
  exports:[RolePipe]
})
export class SharedModule { }
