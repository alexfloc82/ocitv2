import { Injectable, EventEmitter } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Tarea} from '../shared/datamodel';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class DashboardService {
  query: any;
  dataTarea: Subject<any>;
  tareas: Tarea[];

  //
  combos: any;

  constructor(
    private db: AngularFireDatabase) {
        this.db.object('/values').subscribe(combos => this.combos = combos);
        this.db.list('/tareas').subscribe(tareas => this.tareas = tareas);
        this.dataTarea = new Subject();
        

  }

  emitNormTarea(){
    this.db.list('/tareas')
    .subscribe(tareas => {
        let fileteredTarea = tareas.filter(a=>true);//prepara el filtro con la query
        fileteredTarea.forEach((tarea, index, tareas)=>{
            tarea['cadena-l'] = this.combos.cadena[tarea.cadena];
            tarea['edicion-l'] = this.combos.edicion[tarea.edicion];
            tarea['semestre-l'] = this.combos.semestre[tarea.semestre];
            tarea['duracion'] = (tarea.eh-tarea.bh)*3600 + (tarea.em - tarea.bm)*60 + (tarea.es-tarea.bs);
        })
        this.dataTarea.next(fileteredTarea);
    });
    

  }

 

}
