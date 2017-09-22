import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { User, Tarea } from '../shared/datamodel';
import { UtilsService } from '../core/utils/utils.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  loader=true;
  tareas: any[];
  displayTareas:any[];
  cadenas:FirebaseListObservable<any[]>;
  semestre:FirebaseListObservable<any[]>;
  combos:FirebaseObjectObservable<any>;
  query: any;

  constructor(
    public authService: AuthService, 
    private db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute) { 
      this.cadenas = this.db.list('/values/cadena');
      this.semestre = this.db.list('/values/semestre');
      this.combos = this.db.object('/values');
      this.query = {cadena:"", id_tarea:"", year:"", semestre:""};
      this.db.list('/tareas',
      {query:{orderByChild:'date'}}).subscribe(a => {
      this.tareas = a.reverse();
      this.displayTareas = a;
      this.loader=false;});
      
  }

  ngOnInit() {

  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onFilterSort(){
    this.displayTareas = this.tareas.filter(tarea => 
      (tarea.cadena == this.query.cadena || this.query.cadena == "") &&
      (tarea.dateNgb.year == this.query.year || this.query.year == "") &&
      (tarea.semestre == this.query.semestre || this.query.semestre == "") &&
      (tarea.id_tarea.toLowerCase().indexOf(this.query.id_tarea.toLowerCase()) > -1 || this.query.id_tarea == ""))
  }

}
