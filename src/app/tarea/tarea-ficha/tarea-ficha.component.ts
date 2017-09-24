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

import { User, Tarea, Ficha, Item } from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-tarea-ficha',
  templateUrl: './tarea-ficha.component.html',
  styleUrls: ['./tarea-ficha.component.css']
})
export class TareaFichaComponent implements OnInit {
  loader = true;
  ficha: FirebaseObjectObservable<any>;
  form: Ficha; //form data
  tarea: FirebaseObjectObservable<any>;

  //desplegables
  combos: FirebaseObjectObservable<any>;
  minute: number[] = new Array(60);
  hour: number[] = new Array(24);
  rating: number[] = new Array(6);
  format: FirebaseListObservable<any[]>;
  genero: FirebaseListObservable<any[]>;
  zona: FirebaseListObservable<any[]>;
  pais: FirebaseListObservable<any[]>;
  ambito: FirebaseListObservable<any[]>;
  comunidad: FirebaseListObservable<any[]>;
  categoria: FirebaseListObservable<any[]>;
  dqcategoria: FirebaseListObservable<any[]>;
  catTem: FirebaseListObservable<any[]>;
  edicion: FirebaseListObservable<any[]>;
  informador: FirebaseListObservable<any[]>;
  origen: FirebaseListObservable<any[]>;
  relcad: FirebaseListObservable<any[]>;
  retorica: FirebaseListObservable<any[]>;
  rotulos: FirebaseListObservable<any[]>;
  valedit: FirebaseListObservable<any[]>;

  //Etiquetas
  personas: string[];
  temas: string[];

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public utils: UtilsService,
    public messageService: MessageService) {
    this.loader = true;
    this.combos = this.db.object('/values');
    this.format = this.db.list('/values/format');
    this.genero = this.db.list('/values/genero');
    this.zona = this.db.list('/values/zona');
    this.pais = this.db.list('/values/pais', { query: { orderByValue: true } });
    this.ambito = this.db.list('/values/ambito');
    this.comunidad = this.db.list('/values/comunidad');
    this.categoria = this.db.list('/values/categoria');
    this.dqcategoria = this.db.list('/values/dqcategoria');
    this.catTem = this.db.list('/values/catTem');
    this.edicion = this.db.list('/values/edicion');
    this.informador = this.db.list('/values/informador');
    this.origen = this.db.list('/values/origen');
    this.relcad = this.db.list('/values/relcad');
    this.retorica = this.db.list('/values/retorica');
    this.rotulos = this.db.list('/values/rotulos');
    this.valedit = this.db.list('/values/valedit');

  }

  ngOnInit() {
    this.db.list('/fichas').subscribe(fichas => {
      this.personas = [];
      this.temas = [];
      fichas.forEach(ficha => {
        if (ficha.quienes) {
          ficha.quienes.forEach(element => {
            if (element.persona && this.personas.indexOf(element.persona)<0){
              this.personas.push(element.persona)
            }
          })
        }

        if (ficha.dquienes) { 
          ficha.dquienes.forEach(element => {
            if (element.persona && this.personas.indexOf(element.persona)<0){
              this.personas.push(element.persona)
            }
          })
        }

        if (ficha.dques) { 
          ficha.dques.forEach(element => {
            if (element.etiqueta && this.temas.indexOf(element.etiqueta)<0){
              this.temas.push(element.etiqueta)
            }
          })
        }
      })
      this.personas.sort();
      this.temas.sort();
    });

    this.route.paramMap.forEach(
      param => {
        this.tarea = this.db.object('/tareas/' + param.get('id'));
        // new ficha
        if (param.get('idficha') == '-') {
          this.form = new Ficha(param.get('id'));
          this.loader = false;
        }
        // Editing ficha
        else {
          this.ficha = this.db.object('/fichas/' + param.get('idficha'));
          this.ficha.subscribe(
            a => {
              this.form = a;
              if (!this.form.localidades) { this.form.localidades = [] }
              if (!this.form.lugares) { this.form.lugares = [] }
              if (!this.form.origen) { this.form.origen = [] }
              if (!this.form.quienes) { this.form.quienes = [] }
              if (!this.form.dquienes) { this.form.dquienes = [] }
              if (!this.form.dques) { this.form.dques = [] }
              if (!this.form.retorica) { this.form.retorica = [] }
              if (!this.form.rotulos) { this.form.rotulos = [] }
              this.loader = false;
            }
          )
        }
      }
    );
  }

  goBack(): void {
    this.router.navigate(['Tarea', this.tarea.$ref.key]);
  }

  delete() {
    this.ficha.remove()
      .then(
      a => this.router.navigate(['Tarea', this.tarea.$ref.key]))
      .catch(
      err => this.messageService.sendMessage(err.message, 'error')
      );
  }

  onSubmit() {
    //Update object in database
    if (this.ficha) {
      this.ficha.update(this.form)
        .then(a => this.messageService.sendMessage('La ficha ha sido guardada', 'success'))
        .catch(
        err => this.messageService.sendMessage(err.message, 'error')
        );
    }
    //Create new object
    else {
      this.db.list('/fichas').push(this.form)
        .then(a => {
          this.messageService.sendMessage('La ficha ha sido guardada', 'success');
          this.router.navigate(['Tarea', this.tarea.$ref.key, a.key]);
        })
        .catch(
        err => this.messageService.sendMessage(err.message, 'error')
        );;
    }
  }

  addElem(elem: string) {
    switch (elem) {
      case 'lugar':
        this.form.lugares.push(new Item());
        break;
      case 'localidad':
        this.form.localidades.push(new Item());
        break;
      case 'quien':
        this.form.quienes.push(new Item());
        break;
      case 'dquien':
        this.form.dquienes.push(new Item());
        break;
      case 'dque':
        this.form.dques.push(new Item());
        break;
      default:
        break;
    }
  }

  deleteElem(elem: string, item: number) {
    switch (elem) {
      case 'lugar':
        this.form.lugares.splice(item, 1);
        break;
      case 'localidad':
        this.form.localidades.splice(item, 1);
        break;
      case 'quien':
        this.form.quienes.splice(item, 1);
        break;
      case 'dquien':
        this.form.dquienes.splice(item, 1);
        break;
      case 'dque':
        this.form.dques.splice(item, 1);
        break;
      default:
        break;
    }
  }

  //Personas typeahead
  psearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.personas.filter(persona => persona.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  //Temas typeahead
  tsearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.temas.filter(tema => tema.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

}
