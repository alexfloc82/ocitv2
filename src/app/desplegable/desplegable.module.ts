import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { DesplegableRoutingModule } from './desplegable-routing.module';
import { DesplegableComponent } from './desplegable.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  imports: [
    CommonModule,FormsModule,
    DesplegableRoutingModule
  ],
  declarations: [DesplegableComponent, TooltipComponent]
})
export class DesplegableModule { }
