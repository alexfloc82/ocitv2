import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';

import { Timesheet, User, Proposal } from '../shared/datamodel';
import { TimesheetMeses, TimesheetMesComponent } from './timesheet-date.service';

@Component({
  selector: 'app-timesheet',
  /*template: `<div>
    <p>Today is {{((today | date: 'M')-1)}}</p>
    <p>Or if you prefer, {{today | date:'fullDate'}}</p>
    <p>The time is {{today | date:'jmZ'}}</p>
  </div>`,*/
  /*template: `
  <h2>Meses</h2>
    <ul>
      <li *ngFor="let mes of meses">
        <span>{{mes.id}}</span> {{mes.name}}
      </li>
    </ul>
    `,*/
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: [TimesheetMeses]
})

export class TimesheetComponent implements OnInit {
  meses: TimesheetMesComponent[]
  today: number = Date.now();
  loader = { 'user': true, 'timesheet': true };
  timesheets: any[];
  filteredTimesheets: any[];
  fecha: any[];
  items: any[];

  constructor(
    private timesheetDateService: TimesheetMeses,
    public authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute, ) {

    this.getTimesheets();
  }

  ngOnInit(): void {
    this.getMeses();
  }

  private showLoader(): void {
        console.log('Show loader');
  }

  private hideLoader(): void {
    console.log('Hide loader');
  }

  createRange(numero) {
    this.items = [];
    let i = 0;

    for (i = 1; i <= numero; i++) {
       this.items.push(i);
    }
    return this.items;
  }

  private getTimesheets() {
     this.db.list('/timesheets').subscribe(a => {
       this.timesheets = a;
       this.timesheets.forEach(timesheet => {
         timesheet.userObj = new User();
         timesheet.proposalObj = new Proposal();
         this.db.object('/users/' + timesheet.user).subscribe(a => { timesheet.userObj = a; this.loader.user = false; });
         this.db.object('/proposals/' + timesheet.proposal).subscribe(a => { timesheet.proposalObj = a; this.loader.timesheet = false; });
        }
       );
       this.filteredTimesheets = this.timesheets;
      }
     );
   }

   getMes (num) {
      let mes: number;

      mes = this.today + num;

      return mes;
   }

   suma (num1: number, num2: number) {

    let result: number;

    result = Number(num1) + Number(num2);

    return result;
   }

   public getMeses(): void {
     this.timesheetDateService.getMeses().then(meses => this.meses = meses);
   }
}
