import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import {Data} from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

import { UIChart } from 'primeng/primeng';

@Component({
  selector: 'app-dash-general',
  templateUrl: './dash-general.component.html',
  styleUrls: ['./dash-general.component.css']
})
export class DashGeneralComponent implements OnInit {
  totalTareaChartData:any[];
  totalPiezaChartData: any[];
  informativos: any[];
  piezas: any[];
  backgroundColors = ["#FF6384", "#4BC0C0", "#36A2EB", "#FFCE56", '#9CCC65', 'purple'];

  cadenas: any;

  constructor(
    private dashService: DashboardService, private db: AngularFireDatabase
  ) {
    this.totalTareaChartData = [];
    this.totalPiezaChartData = [];
    this.db.object('/values').subscribe(combos => this.cadenas = combos.cadena);

    this.dashService.dataTarea.subscribe(tareas => {
      this.formatTareas(tareas);
      this.informativos = tareas;
    });

    this.dashService.dataFicha.subscribe(piezas => {
      this.formatPiezas(piezas);
      this.piezas = piezas;
    });
  }


  ngOnInit() {
    this.dashService.emitNormTarea();
    this.dashService.emitNormFicha();
  }


  formatTareas(tareas: any[]) {
    this.totalTareaChartData = [];
    if (this.cadenas) {
      this.cadenas.forEach((element, index) => {
        let medData;
        let NumTarea = tareas.filter(tarea => tarea.cadena == index).length;
        let duracion = tareas.filter(tarea => tarea.cadena == index).reduce((prev, newval, index, tareas) => {
          return prev + tareas[index].duracion;
        }, 0)
        if (NumTarea > 0) {
          medData = duracion / NumTarea;
        }
        else {
          medData = 0;
        }
        this.totalTareaChartData.push({cadena:element, total:NumTarea, dur:duracion, med: medData});
      });

    }
  }

  formatPiezas(piezas: any[]) {
    this.totalPiezaChartData = [];
    if (this.cadenas) {
      this.cadenas.forEach((element, index) => {
        //total
        let NumTarea = piezas.filter(pieza => pieza.tarea.cadena == index).length;
        //duracion
        let duracion = piezas.filter(pieza => pieza.tarea.cadena == index).reduce((prev, newval, index, piezas) => {
          return prev + piezas[index].duracion;
        }, 0)
        //media
        let medData;
        if (NumTarea > 0) {
          medData = duracion / NumTarea;
        }
        else {
          medData = 0;
        }
        this.totalPiezaChartData.push({cadena:element, total:NumTarea, dur:duracion, med: medData});
      });
    }
  }

}
