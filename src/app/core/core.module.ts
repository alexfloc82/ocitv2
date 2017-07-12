import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
  ],
  imports: [
   NgbModule.forRoot(), HttpModule, FormsModule, CommonModule
  ]
})
export class CoreModule { }
