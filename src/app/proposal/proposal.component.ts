import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { User, Proposal } from '../shared/datamodel';
import { UtilsService } from '../core/utils/utils.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {
  loader=true;
  proposals: any[];
  closedProposals: any[];
  inprogressProposals: any[];

  constructor(
    public authService: AuthService, 
    private db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute,) { 
      db.list('/proposals').subscribe(a => {
      this.proposals = a;
      this.closedProposals = this.proposals.filter(proposal => proposal.closed);
      this.inprogressProposals = this.proposals.filter(proposal => !proposal.closed);
      this.inprogressProposals.push({});
      this.loader=false;});
    }

  ngOnInit() {
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

}
