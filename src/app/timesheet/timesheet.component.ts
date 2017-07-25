import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';

import { Timesheet } from '../shared/datamodel';

import { User, Proposal } from '../shared/datamodel';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})

export class TimesheetComponent implements OnInit {

  loader = { 'user': true, 'timesheet': true };
  timesheets: any[];
  filteredTimesheets: any[];

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute, ) {
    // this.loader.timesheet = true;

    this.getTimesheets();
  }

  ngOnInit() {
  }

  private showLoader(): void {
        console.log('Show loader');
  }

  private hideLoader(): void {
    console.log('Hide loader');
  }

  private getTimesheets() {
     this.db.list('/timesheets').subscribe(a => {
       this.timesheets = a;
       this.timesheets.forEach(timesheet => {
         timesheet.userObj = new User();
         timesheet.proposalObj = new Proposal();
         this.db.object('/users/' + timesheet.user).subscribe(a => { timesheet.userObj = a; this.loader.user = false; });
         this.db.object('/proposals/' + timesheet.proposal).subscribe(a => { timesheet.proposalObj = a; this.loader.timesheet = false; });
        /*this.loader.user = false;
        this.loader.timesheet = false;*/
        }
       );
       this.filteredTimesheets = this.timesheets;
      }
     );
   }
}
