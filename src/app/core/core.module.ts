import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth/auth.service';
import { QuestionControlService }    from './question/question-control.service';
import {MessageService} from './message/message.service'

@NgModule({
  declarations: [
  ],
  imports: [
   NgbModule.forRoot(), HttpModule, FormsModule, CommonModule
  ],
  providers:[AuthService, AngularFireDatabase, QuestionControlService, MessageService]
})
export class CoreModule { }
