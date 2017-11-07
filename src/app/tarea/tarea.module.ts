import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { TareaRoutingModule } from './tarea-routing.module';
import { TareaComponent } from './tarea.component';
import { TareaDetailComponent } from './tarea-detail/tarea-detail.component';
import { TareaFichaComponent } from './tarea-ficha/tarea-ficha.component';
import { DataTableModule} from 'primeng/primeng';

import {OverlayPanelModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, FormsModule,NgbModule,OverlayPanelModule,SpinnerModule,
    DataTableModule,
    TareaRoutingModule
  ],
  declarations: [TareaComponent, TareaDetailComponent, TareaFichaComponent]
})
export class TareaModule { }
