import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

import { UIChart } from 'primeng/primeng';

@Component({
  selector: 'app-dash-general',
  templateUrl: './dash-general.component.html',
  styleUrls: ['./dash-general.component.css']
})
export class DashGeneralComponent implements OnInit {
  tareas: any[];
  totalPiezaChart: any;
  backgroundColors = ["#FF6384", "#4BC0C0", "#36A2EB", "#FFCE56", '#9CCC65', 'purple'];

  cadenas: any;

  constructor(
    private dashService: DashboardService, private db: AngularFireDatabase
  ) {
    this.db.object('/values').subscribe(combos => this.cadenas = combos.cadena);
    this.totalPiezaChart = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: this.backgroundColors,
            hoverBackgroundColor: this.backgroundColors
          }
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Numero total de informativos por cadena'
        }
      }
    }

    this.dashService.dataTarea.subscribe(tareas => {
      this.getTotalPiezas(tareas);
    })
  }


  ngOnInit() {
    this.dashService.emitNormTarea();
  }


  getTotalPiezas(tareas: any[]) {
    let labels = [];
    let data = [];
    this.cadenas.forEach((element, index) => {
      labels.push(element);
      data.push(tareas.filter(tarea => tarea.cadena == index).length);
    });
    this.totalPiezaChart.data.datasets[0].data = data;
    this.totalPiezaChart.data.labels = labels;
  }

}
