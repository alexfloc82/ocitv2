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
  combos: FirebaseObjectObservable<any>;

  constructor(
    private db: AngularFireDatabase) {
        this.combos = this.db.object('/values');
        this.dataTarea = new Subject();
        

  }

  emitNormTarea(){
    this.db.list('/tareas')
    .subscribe(tareas => {
        let fileteredTarea = tareas.filter(a=>true);//prepara el filtro con la query
        fileteredTarea.forEach((tarea, index, tareas)=>{
            tarea['cadena-l'] = 1;
        })
        this.dataTarea.next(fileteredTarea);
    });
    

  }

 

}
