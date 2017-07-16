import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserComponent} from './user.component';
import {UserDetailComponent} from './user-detail.component';
import {UserSigninComponent} from './user-signin.component';


const routes: Routes = [
  { path: '',    component: UserComponent },
  { path: 'User/:id',    component: UserDetailComponent },
  { path: 'user/Signin',    component: UserSigninComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
