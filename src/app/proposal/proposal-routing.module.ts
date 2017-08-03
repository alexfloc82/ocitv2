import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProposalComponent} from './proposal.component'
import {ProposalDetailComponent} from './proposal-detail.component'

const routes: Routes = [
  { path: '',    component: ProposalComponent },
  { path: ':id',    component: ProposalDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule { }
