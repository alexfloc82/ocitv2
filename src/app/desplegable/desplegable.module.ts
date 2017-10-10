import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { DesplegableRoutingModule } from './desplegable-routing.module';
import { DesplegableComponent } from './desplegable.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { DespAdminComponent } from './desp-admin/desp-admin.component';
import { DespCloudComponent } from './desp-cloud/desp-cloud.component';

@NgModule({
  imports: [
    CommonModule,FormsModule,
    DesplegableRoutingModule
  ],
  declarations: [DesplegableComponent, TooltipComponent, DespAdminComponent, DespCloudComponent]
})
export class DesplegableModule { }
