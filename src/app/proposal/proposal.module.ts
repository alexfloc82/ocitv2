import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalRoutingModule } from './proposal-routing.module';
import { ProposalComponent } from './proposal.component';

@NgModule({
  imports: [
    CommonModule,
    ProposalRoutingModule
  ],
  declarations: [ProposalComponent]
})
export class ProposalModule { }
