import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  combos:FirebaseListObservable<any[]>;

  constructor(
    public authService: AuthService, 
    private db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute) { 
      db.list('/proposals').subscribe(a => {
        this.tareas = a;
        this.displayTareas = a;
        this.loader=false;});
  }

  ngOnInit() {
    this.combos = this.db.list('/values/cadena');
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onFilterSort(value:string){
    this.displayTareas = this.tareas.filter(user => 
        user.name.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.email.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.lastname.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1)
  }

}
