import { Component, OnInit } from '@angular/core';

import {DashboardService} from './dashboard.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedItem:string;
  semestre:FirebaseListObservable<any[]>;
  query:any;
  loader:boolean;

  constructor(
    private dashService : DashboardService,
    private db: AngularFireDatabase
  ) { 
    
    this.semestre = this.db.list('/values/semestre');
    this.query = {semestre:""};
  }

  ngOnInit() {
    this.loader = true; 
    this.selectedItem = 'Data';
    this.dashService.emitNormTarea();
    this.dashService.emitNormFicha(); 
    this.loader = false;  
  }

  selectItem(selectedItem: any) {
    this.selectedItem = selectedItem;
  }

  performQuery(){
    this.dashService.setQuery(this.query);
  }
}
