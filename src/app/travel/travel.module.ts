import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import {TravelDetailComponent} from './travel-detail.component';

@NgModule({
  imports: [
    CommonModule,CoreModule,
    TravelRoutingModule, ReactiveFormsModule, FormsModule, NgbModule.forRoot()
  ],
  declarations: [TravelComponent,TravelDetailComponent]
})
export class TravelModule { }
