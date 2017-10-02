import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Data } from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dash-data',
  templateUrl: './dash-data.component.html',
  styleUrls: ['./dash-data.component.css']
})
export class DashDataComponent implements OnInit {
    loader = false;
    piezas: any[];
    informativos: any[];
    lugares: any[];
    locals: any[];
    quienes: any[];
    dquienes: any[];
    dques: any[];

  
    constructor(
      private dashService: DashboardService, private db: AngularFireDatabase
    ) {
      this.loader = false;
      
      this.dashService.dataTarea.subscribe(tareas => {
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
  
    formatPiezas(piezas: any[]) {  
      this.lugares = [];
      this.locals = [];
      this.quienes = [];
      this.dquienes = [];
      this.dques = [];

      piezas.forEach(pieza => {
        pieza.lugares.forEach(lugar => {
          lugar['ambito'] = pieza['ambito-l'];
          lugar['zona'] = pieza['zona-l'];
          lugar['espConjunto'] = pieza['espConjunto'];
          this.lugares.push(lugar);
        });

        pieza.localidades.forEach(local =>{
          this.locals.push(local);
        });

        pieza.quienes.forEach(quien =>{
          this.quienes.push(quien);
        });

        pieza.dquienes.forEach(quien =>{
          this.dquienes.push(quien);
        });

        pieza.dques.forEach(dque =>{
          dque['tematica']=pieza['catTem-l'];
          this.dques.push(dque);
        });

       // pieza['retorica'] = '';
       // pieza.retorica.forEach(retorica => pieza['retorica']=pieza['retorica'] + ' ' + retorica['retorica-l'])

      });

      this.loader = false;
    }
  
  }
  
