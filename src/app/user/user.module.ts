import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }          from '@angular/forms';
import {CoreModule} from '../core/core.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {UserDetailComponent} from './user-detail.component';
import {UserSigninComponent} from './user-signin.component';

@NgModule({
  imports: [
    CommonModule, CoreModule, 
    UserRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [UserComponent, UserDetailComponent,  UserSigninComponent ]
})
export class UserModule { }
