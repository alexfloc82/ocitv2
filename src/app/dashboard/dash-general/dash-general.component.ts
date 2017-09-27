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
  totalTareaChart: any;
  duracionTareaChart: any;
  duracionMedTareaChart: any;
  totalPiezaChart: any;
  duracionPiezaChart: any;
  duracionMedPiezaChart: any;
  backgroundColors = ["#FF6384", "#4BC0C0", "#36A2EB", "#FFCE56", '#9CCC65', 'purple'];

  cadenas: any;

  constructor(
    private dashService: DashboardService, private db: AngularFireDatabase
  ) {
    this.db.object('/values').subscribe(combos => this.cadenas = combos.cadena);
    this.totalTareaChart = {
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
    this.duracionTareaChart = {
      type: 'horizontalBar',
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
          text: 'Duracion total de informativos por cadena (en segundos)'
        },
        legend:{display:false}
      }
    }
    this.duracionMedTareaChart = {
      type: 'bar',
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
          text: 'Duracion media de informativos por cadena (en segundos)'
        },
        legend:{display:false}
      }
    }

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
          text: 'Numero total de piezas por cadena'
        }
      }
    }
    this.duracionPiezaChart = {
      type: 'horizontalBar',
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
          text: 'Duracion total de piezas por cadena (en segundos)'
        },
        legend:{display:false}
      }
    }
    this.duracionMedPiezaChart = {
      type: 'bar',
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
          text: 'Duracion media de piezas por cadena (en segundos)'
        },
        legend:{display:false}
      }
    }

    this.dashService.dataTarea.subscribe(tareas => {
      this.formatTareas(tareas);
    });

    this.dashService.dataFicha.subscribe(piezas => {
      this.formatPiezas(piezas);
    });
  }


  ngOnInit() {
    this.dashService.emitNormTarea();
    this.dashService.emitNormFicha();
  }


  formatTareas(tareas: any[]) {
    let labels = [];
    let data = [];
    let duracionData = [];
    let medData = [];
    this.cadenas.forEach((element, index) => {
      labels.push(element);
      let NumTarea = tareas.filter(tarea => tarea.cadena == index).length;
      let duracion = tareas.filter(tarea => tarea.cadena == index).reduce((prev,newval,index,tareas) => {
        return prev + tareas[index].duracion;
      },0)
      duracionData.push(duracion);
      data.push(NumTarea);
      if(NumTarea>0){
        medData.push(duracion/NumTarea);
      }
      else{
        medData.push(0);
      }
    });
    this.totalTareaChart.data.datasets[0].data = data;
    this.duracionTareaChart.data.datasets[0].data = duracionData;
    this.duracionMedTareaChart.data.datasets[0].data = medData;
    this.totalTareaChart.data.labels = labels;
    this.duracionTareaChart.data.labels = labels;
    this.duracionMedTareaChart.data.labels = labels;
  }

  formatPiezas(piezas: any[]) {
    let labels = [];
    let data = [];
    let duracionData = [];
    let medData = [];
    this.cadenas.forEach((element, index) => {
      labels.push(element);
      let NumTarea = piezas.filter(pieza => pieza.tarea.cadena == index).length;
      let duracion = piezas.filter(pieza => pieza.tarea.cadena == index).reduce((prev,newval,index,piezas) => {
        return prev + piezas[index].duracion;
      },0)
      duracionData.push(duracion);
      data.push(NumTarea);
      if(NumTarea>0){
        medData.push(duracion/NumTarea);
      }
      else{
        medData.push(0);
      }
    });
    this.totalPiezaChart.data.datasets[0].data = data;
    this.duracionPiezaChart.data.datasets[0].data = duracionData;
    this.duracionMedPiezaChart.data.datasets[0].data = medData;
    this.totalPiezaChart.data.labels = labels;
    this.duracionPiezaChart.data.labels = labels;
    this.duracionMedPiezaChart.data.labels = labels;
  }

}
