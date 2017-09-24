import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../core/auth/auth.service';
import { MessageService } from '../../core/message/message.service';
import { UtilsService } from '../../core/utils/utils.service';

import { User, Tarea, Ficha } from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.css']
})
export class TareaDetailComponent implements OnInit {
  loader = true;
  tarea: FirebaseObjectObservable<any>;
  form: Tarea; //form data
  fichas: Ficha[];
  displayFichas: any[];
  startDate ={year:null, month:null};


  //desplegables
  cadenas: FirebaseListObservable<any[]>;
  semestres: FirebaseListObservable<any[]>;
  edicion: FirebaseListObservable<any[]>;
  combos: FirebaseObjectObservable<any>;
  minute: number[] = new Array(60);
  hour: number[] = new Array(24);
  users: User[]; // list of elegible users
  selectedAnalista: User;
  selectedRevisor: User;

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public utils: UtilsService,
    public messageService: MessageService) {
    this.loader = true;
    this.db.list('/users').subscribe(a => this.users = a);
    this.cadenas = this.db.list('/values/cadena');
    this.semestres = this.db.list('/values/semestre');
    this.edicion = this.db.list('/values/edicion');
    this.combos = this.db.object('/values');
  }

  ngOnInit() {
    this.route.paramMap.forEach(
      param => {
        // new tarea
        if (param.get('id') == '-') {
          let now = new Date().toISOString();
          this.form = new Tarea(now, this.utils.convertISOToNgbDate(now));
          this.startDate={year: new Date().getFullYear(), month: new Date().getMonth() + 1}
          this.loader = false;
        }
        // Editing tarea
        else {
          this.tarea = this.db.object('/tareas/' + param.get('id'));

          this.db.list('/fichas',{query:{
            orderByChild:'tarea_id',
            equalTo:param.get('id')
          }})
            .subscribe(fichas => this.fichas = fichas.sort(this.compareFichas));

          this.tarea.subscribe(
            a => {
              this.form = a;
              this.startDate={year: this.form.dateNgb.year, month: this.form.dateNgb.month}
              if(a.analista){this.db.object('/users/' + a.analista).subscribe(b => this.selectedAnalista = b);}
              if(a.revisor){this.db.object('/users/' + a.revisor).subscribe(b => this.selectedRevisor = b);}
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

  //Comprueba que todas las fichas han sido terminadas
  checkTerminado() {
    let fichasNoTerminadas = this.fichas.filter(ficha => !ficha.terminado);
    if (fichasNoTerminadas.length > 0) {
      this.messageService.sendMessage('Existen ' + fichasNoTerminadas.length + ' fichas no terminadas', 'error');
      return false;
    }
  }

  goBack(): void {
    this.router.navigate(['Tarea']);
  }

  onSubmit() {
    if (!this.form.id_tarea) {
      this.messageService.sendMessage('EL ID tarea es un dato obligatorio', 'error')
      return false;
    }
    this.form.date = this.utils.convertNgbDateToISO(this.form.dateNgb);
    //Update object in database
    if (this.tarea) {
      this.tarea.update(this.form)
        .then(a => this.messageService.sendMessage('La tarea ha sido guardada', 'success'))
        .catch(
        err => this.messageService.sendMessage(err.message, 'error')
        );
    }
    //Create new object
    else {
      this.db.list('/tareas').push(this.form)
        .then(a => {
          this.messageService.sendMessage('La tarea ha sido guardada', 'success');
          this.router.navigate(['Tarea', a.key]);
        })
        .catch(
        err => this.messageService.sendMessage(err.message, 'error')
        );;
    }
  }

  compareFichas(a: Ficha, b: Ficha) {
    if (a.bhour > b.bhour) { return 1 }
    if (a.bmin > b.bmin) { return 1 }
    if (a.bsec > b.bsec) { return 1 }
    return -1;
  }

  delete() {

    this.db.list('/fichas', {query:{orderByChild:'tarea_id', equalTo:this.tarea.$ref.key}}).subscribe(fichas =>{
      fichas.forEach(ficha =>{
        this.db.object('/fichas/' + ficha.$key).remove().catch(
          err => this.messageService.sendMessage(err.message, 'error')
        );;
      })
    })

    this.tarea.remove().then(a => this.router.navigate(['Tarea'])).catch(
      err => this.messageService.sendMessage(err.message, 'error')
    );
  }


  //User typeahead
  usearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.users.filter(user => (user.name + ' ' + user.lastname).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  uformatter = (user: User) => user.name + ' ' + user.lastname;

  selectAnalista(selectedItem: any) {
    this.form.analista = selectedItem.item.$key;
  }

  selectRevisor(selectedItem: any) {
    this.form.revisor = selectedItem.item.$key;
  }
  

}
