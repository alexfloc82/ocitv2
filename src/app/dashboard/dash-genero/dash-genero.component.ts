import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Data } from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dash-genero',
  templateUrl: './dash-genero.component.html',
  styleUrls: ['./dash-genero.component.css']
})
export class DashGeneroComponent implements OnInit {
  loader = false;
  
    generoData: any[];
    generoDataCadenaTotal: any[];
    generoDataCadenaMed: any[];
    generoDataCadenaDur: any[];
    piezas: any[];
    generos: any[];
  
    constructor(
      private dashService: DashboardService, private db: AngularFireDatabase
    ) {
      this.loader = true;
      this.db.list('/values/genero').subscribe(generos => this.generos = generos);
  
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
      this.generoData = [];
      this.db.list('/values/genero').subscribe(genero => {
        genero.forEach(genero => {
          let num = piezas.filter(pieza => pieza.genero == genero.$key).length;
          let duracion = piezas.filter(pieza => pieza.genero == genero.$key).reduce((prev, newval, index, piezas) => {
            return prev + piezas[index].duracion;
          }, 0)
          let media;
          if (num > 0) {
            media = duracion / num;
          }
          else {
            media = 0;
          }
          this.generoData.push({ genero: genero.$value, total: num, dur: duracion, med: media });
        }
        )
      })
  
      this.generoDataCadenaTotal=[];
      this.generoDataCadenaDur=[];
      this.generoDataCadenaMed=[];
      this.db.list('/values/cadena').subscribe(cadenas => {
        cadenas.forEach(cadena => {
          this.db.list('/values/genero').subscribe(genero => {
            let total={cadena:cadena.$value};
            let dur={cadena:cadena.$value};
            let med={cadena:cadena.$value};
            genero.forEach(genero => {
              let num = piezas.filter(pieza => (pieza.genero == genero.$key) && (pieza.tarea.cadena == cadena.$key)).length;
              let duracion  = piezas.filter(pieza => (pieza.genero == genero.$key) && (pieza.tarea.cadena == cadena.$key)).reduce((prev, newval, index, piezas) => {
                return prev + piezas[index].duracion;
              }, 0)
              let media;
              if (num > 0) {
                media = duracion / num;
              }
              else {
                media = 0;
              }
              total[genero.$value] = num;
              dur[genero.$value] = duracion;
              med[genero.$value] = media;
            })
            this.generoDataCadenaTotal.push(total);
            this.generoDataCadenaDur.push(dur);
            this.generoDataCadenaMed.push(med);
          })
  
        });
      })
  
  
      this.loader = false;
    }
  
  }
