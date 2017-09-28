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
