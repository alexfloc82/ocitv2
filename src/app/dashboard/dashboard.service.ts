import { Injectable, EventEmitter } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Tarea} from '../shared/datamodel';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class DashboardService {
  query: any;
  dataTarea: Subject<any>;
  dataFicha: Subject<any>;
  tareas: Tarea[];

  //
  combos: any;

  constructor(
    private db: AngularFireDatabase) {
      this.query={semestre:""};
        this.db.object('/values').subscribe(combos => this.combos = combos);
        this.db.object('/tareas').subscribe(tareas => this.tareas = tareas);
        this.dataTarea = new Subject();
        this.dataFicha = new Subject();
        

  }

  emitNormTarea(){
    this.db.list('/tareas')
    .subscribe(tareas => {
        let fileteredTarea = tareas.filter(a=> (this.query.semestre =="" || this.query.semestre == a.semestre));//prepara el filtro con la query
        fileteredTarea.forEach((tarea, index, tareas)=>{
            tarea['cadena-l'] = this.combos.cadena[tarea.cadena];
            tarea['edicion-l'] = this.combos.edicion[tarea.edicion];
            tarea['semestre-l'] = this.combos.semestre[tarea.semestre];
            tarea['duracion'] = (tarea.eh-tarea.bh)*3600 + (tarea.em - tarea.bm)*60 + (tarea.es-tarea.bs);
        })
        this.dataTarea.next(fileteredTarea);
    });
  }

  emitNormFicha(){
    this.db.list('/fichas')
    .subscribe(fichas => {
        fichas.forEach((ficha, index, fichas)=>{
          ficha['tarea'] = this.tareas[ficha.tarea_id];
        });
        let fileteredFicha = fichas.filter(a=>(this.query.semestre =="" || this.query.semestre == a.tarea.semestre));//prepara el filtro con la query
        fileteredFicha.forEach((ficha, index, fichas)=>{
          ficha['genero-l'] = this.combos.genero[ficha.genero];
          ficha['format-l'] = this.combos.format[ficha.format];
          ficha['ambito-l'] = this.combos.ambito[ficha.ambito];
          ficha['relcad-l'] = this.combos.relcad[ficha.relcad];
          ficha['valedit-l'] = this.combos.valedit[ficha.valedit];
          ficha['informador-l'] = this.combos.informador[ficha.informador];
          ficha['zona-l'] = this.combos.zona[ficha.zona];
          ficha['catTem-l'] = this.combos.catTem[ficha.catTem];
          if(ficha.lugares){
            ficha.lugares.forEach(lugar =>{
              lugar['pieza'] = ficha.$key;
              if(lugar.pais){lugar['pais-l']=this.combos.pais[lugar.pais];}
              if(lugar.comunidad){lugar['comunidad-l']=this.combos.comunidad[lugar.comunidad];}
            })
          }
          else{
            ficha['lugares']=[];
          }
          if(ficha.localidades){
            ficha.localidades.forEach(lugar =>{
              lugar['pieza'] = ficha.$key;
            })
          }
          else{
            ficha['localidades']=[];
          }
          if(ficha.dques){
            ficha.dques.forEach(dque =>{
              dque['pieza'] = ficha.$key;
              if(dque.categoria){dque['categoria-l']=this.combos.dqcategoria[dque.categoria];}
            })
          }
          else{
            ficha['dques']=[];
          }
          if(ficha.quienes){
            ficha.quienes.forEach(quien =>{
              quien['pieza'] = ficha.$key;
              if(quien.categoria){quien['categoria-l']=this.combos.categoria[quien.categoria];}
            })
          }
          else{
            ficha['quienes']=[];
          }
          if(ficha.dquienes){
            ficha.dquienes.forEach(dquien =>{
              dquien['pieza'] = ficha.$key;
              if(dquien.categoria){dquien['categoria-l']=this.combos.categoria[dquien.categoria];}
            })
          }
          else{
            ficha['dquienes']=[];
          }
          if(ficha.origen){
            ficha['origen-l']=[];
            ficha.origen.forEach(valor =>{
              ficha['origen-l'].push({key:valor, value:this.combos.origen[valor], pieza: ficha.$key});
            })
          }
          else{
            ficha['origen']=[];
          }
          if(ficha.rotulos){
            ficha['rotulos-l']=[];
            ficha.rotulos.forEach(valor =>{
              ficha['rotulos-l'].push({key:valor, value:this.combos.rotulos[valor], pieza: ficha.$key})
            })
          }
          else{
            ficha['rotulos']=[];
          }
          if(ficha.retorica){
            ficha['retorica-l']=[];
            ficha.retorica.forEach(valor =>{
              ficha['retorica-l'].push({key:valor, value:this.combos.retorica[valor], pieza: ficha.$key})
            })
          }
          else{
            ficha['retorica']=[];
          }
          ficha['duracion'] = (ficha.ehour-ficha.bhour)*3600 + (ficha.emin - ficha.bmin)*60 + (ficha.esec-ficha.bsec);
        })
        this.dataFicha.next(fileteredFicha);
    });
  }

  setQuery(query: any){
    this.query=query;
    this.emitNormTarea();
    this.emitNormFicha();
  }

 

}
