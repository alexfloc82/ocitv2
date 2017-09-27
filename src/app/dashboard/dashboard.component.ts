import { Component, OnInit } from '@angular/core';

import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedItem:string;

  constructor(
    private dashService : DashboardService,
  ) { }

  ngOnInit() {
    this.dashService.emitNormTarea();
    this.selectedItem = 'General';
  }

  selectItem(selectedItem: any) {
    this.selectedItem = selectedItem;
  }
}
