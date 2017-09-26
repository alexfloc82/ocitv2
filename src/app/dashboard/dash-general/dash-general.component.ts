import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dash-general',
  templateUrl: './dash-general.component.html',
  styleUrls: ['./dash-general.component.css']
})
export class DashGeneralComponent implements OnInit {
  tareas: any[];

  constructor(
    private dashService : DashboardService,
  ) { 
    this.dashService.dataTarea.subscribe(tareas => this.tareas  = tareas)

  }

  ngOnInit() {
  }

}
