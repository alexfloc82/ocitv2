import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { ReactiveFormsModule, FormsModule }          from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth/auth.service';
import {MessageService} from './message/message.service';
import {MessageService as MsgService} from 'primeng/components/common/messageservice';
import { UtilsService } from './utils/utils.service';

@NgModule({
  declarations: [
  ],
  exports:[],
  imports: [
   NgbModule.forRoot(), HttpModule, FormsModule, CommonModule, ReactiveFormsModule
  ],
  providers:[AuthService, AngularFireDatabase, MessageService, UtilsService, MsgService]
})
export class CoreModule { }
