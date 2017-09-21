import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { DesplegableRoutingModule } from './desplegable-routing.module';
import { DesplegableComponent } from './desplegable.component';

@NgModule({
  imports: [
    CommonModule,FormsModule,
    DesplegableRoutingModule
  ],
  declarations: [DesplegableComponent]
})
export class DesplegableModule { }
