import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Data } from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

import { UIChart } from 'primeng/primeng';


@Component({
  selector: 'app-dash-format',
  templateUrl: './dash-format.component.html',
  styleUrls: ['./dash-format.component.css']
})
export class DashFormatComponent implements OnInit {
  loader = false;

  formatData: any[];
  formatDataCadenaTotal: any[];
  formatDataCadenaMed: any[];
  formatDataCadenaDur: any[];
  piezas: any[];
  formats: any[];

  constructor(
    private dashService: DashboardService, private db: AngularFireDatabase
  ) {
    this.loader = true;
    this.db.list('/values/format').subscribe(formats => this.formats = formats);

    this.dashService.dataFicha.subscribe(piezas => {
      this.formatPiezas(piezas);
      this.piezas = piezas;
    });
  }

  ngOnInit() {
    this.dashService.emitNormTarea();
    this.dashService.emitNormFicha();
  }

  formatPiezas(piezas: any[]) {
    this.formatData = [];
    this.db.list('/values/format').subscribe(format => {
      format.forEach(format => {
        let num = piezas.filter(pieza => pieza.format == format.$key).length;
        let duracion = piezas.filter(pieza => pieza.format == format.$key).reduce((prev, newval, index, piezas) => {
          return prev + piezas[index].duracion;
        }, 0)
        let media;
        if (num > 0) {
          media = duracion / num;
        }
        else {
          media = 0;
        }
        this.formatData.push({ format: format.$value, total: num, dur: duracion, med: media });
      }
      )
    })

    this.formatDataCadenaTotal=[];
    this.formatDataCadenaDur=[];
    this.formatDataCadenaMed=[];
    this.db.list('/values/cadena').subscribe(cadenas => {
      cadenas.forEach(cadena => {
        this.db.list('/values/format').subscribe(format => {
          let total={cadena:cadena.$value};
          let dur={cadena:cadena.$value};
          let med={cadena:cadena.$value};
          format.forEach(format => {
            let num = piezas.filter(pieza => (pieza.format == format.$key) && (pieza.tarea.cadena == cadena.$key)).length;
            let duracion  = piezas.filter(pieza => (pieza.format == format.$key) && (pieza.tarea.cadena == cadena.$key)).reduce((prev, newval, index, piezas) => {
              return prev + piezas[index].duracion;
            }, 0)
            let media;
            if (num > 0) {
              media = duracion / num;
            }
            else {
              media = 0;
            }
            total[format.$value] = num;
            dur[format.$value] = duracion;
            med[format.$value] = media;
          })
          this.formatDataCadenaTotal.push(total);
          this.formatDataCadenaDur.push(dur);
          this.formatDataCadenaMed.push(med);
        })

      });
    })


    this.loader = false;
  }

}
