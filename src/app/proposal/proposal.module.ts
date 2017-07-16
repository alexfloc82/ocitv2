import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalRoutingModule } from './proposal-routing.module';
import { ProposalComponent } from './proposal.component';
import { ProposalService } from './proposal.service';

@NgModule({
  imports: [
    CommonModule,
    ProposalRoutingModule
  ],
  declarations: [ProposalComponent],
  providers: [ProposalService]
})
export class ProposalModule { }
