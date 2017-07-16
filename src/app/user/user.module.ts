import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }          from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {UserDetailComponent} from './user-detail.component';
import {UserSigninComponent} from './user-signin.component';

import { DynamicFormQuestionComponent } from '../core/question/dynamic-form-question.component'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [UserComponent, UserDetailComponent, DynamicFormQuestionComponent, UserSigninComponent ]
})
export class UserModule { }
