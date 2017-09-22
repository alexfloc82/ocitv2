import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../core/auth/auth.service';
import { MessageService } from '../core/message/message.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { User, Tarea } from '../shared/datamodel';
import { UtilsService } from '../core/utils/utils.service';


@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.css']
})
export class TareaDetailComponent implements OnInit {
  loader=true;
  tarea:FirebaseObjectObservable<any>;
  form: Tarea; //form data
  fichas: any[];
  displayFichas:any[];

  //desplegables
  cadenas: FirebaseListObservable<any[]>;
  semestres: FirebaseListObservable<any[]>;
  combos:FirebaseObjectObservable<any>;

  constructor(
    public authService: AuthService, 
    private db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public utils: UtilsService,
    public messageService: MessageService) { 
      this.loader = true;
      this.cadenas = this.db.list('/values/cadena');
      this.semestres = this.db.list('/values/semestre');
      this.combos = this.db.object('/values');
  }

  ngOnInit() {
    this.route.paramMap.forEach(
      param => {
        // new proposal
        if (param.get('id') == '-') {
          let now = new Date().toISOString();
          this.form = new Tarea();
          this.loader = false;
        }
        // Editing proposal
        else {
          this.tarea = this.db.object('/tareas/' + param.get('id'))
          this.tarea.subscribe(
            a => {
              this.form = a;
              this.loader = false;
            }
          )
        }
      }
    );
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onFilterSort(){

  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    //Update object in database
    if (this.tarea) {
      this.tarea.update(this.form).then(a => this.location.back()).catch(
        err => this.messageService.sendMessage(err.message, 'error')
      );
    }
    //Create new object
    else {
      this.db.list('/tareas').push(this.form).then(a => this.location.back()).catch(
        err => this.messageService.sendMessage(err.message, 'error')
      );;
    }
  }

}
