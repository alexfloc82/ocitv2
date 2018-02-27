import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { NgStyle } from '@angular/common';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../core/auth/auth.service';
import { MessageService } from '../../core/message/message.service';
import { UtilsService } from '../../core/utils/utils.service';

import { OverlayPanel } from 'primeng/primeng';

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
  analista: string;
  revisor: string;

  //desplegables
  combos: FirebaseObjectObservable<any>;
  minute: number[] = new Array(60);
  hour: number[] = new Array(24);
  rating: number[] = new Array(5);
  format: FirebaseListObservable<any[]>;
  genero: FirebaseListObservable<any[]>;
  zona: FirebaseListObservable<any[]>;
  pais: FirebaseListObservable<any[]>;
  ambito: FirebaseListObservable<any[]>;
  comunidad: FirebaseListObservable<any[]>;
  categoria: FirebaseListObservable<any[]>;
  categorias : any[];
  dqcategorias : any[];
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
  lugares: string[];

  //Tooltip
  tooltip: {};

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public utils: UtilsService,
    public messageService: MessageService) {
    this.loader = true;
    this.db.object('/tooltip').subscribe(tooltip => this.tooltip = tooltip);
    this.combos = this.db.object('/values');
    this.format = this.db.list('/values/format');
    this.genero = this.db.list('/values/genero');
    this.zona = this.db.list('/values/zona');
    this.pais = this.db.list('/values/pais', { query: { orderByValue: true } });
    this.ambito = this.db.list('/values/ambito');
    this.comunidad = this.db.list('/values/comunidad');
    this.categoria = this.db.list('/values/categoria');
    this.db.list('/values/categoria').subscribe(a => {
      this.categorias =[];
      a.forEach(cat => this.categorias.push({label:cat.$value, value:{id:cat.$key,name:cat.$value}}))
    });
    this.dqcategoria = this.db.list('/values/dqcategoria');
    this.db.list('/values/dqcategoria').subscribe(a => {
      this.dqcategorias =[];
      a.forEach(cat => this.dqcategorias.push({label:cat.$value, value:{id:cat.$key,name:cat.$value}}))
    });
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

    this.db.list('/mencionados').subscribe(personas => {
      this.personas = [];
      personas.forEach(persona =>
        this.personas.push(persona.$value))
      this.personas.sort();
    });

    this.db.list('/lugares').subscribe(lugares => {
      this.lugares = [];
      lugares.forEach(lugar =>
        this.lugares.push(lugar.$value))
      this.lugares.sort();
    });

    this.db.list('/temas').subscribe(temas => {
      this.temas = [];
      temas.forEach(tema =>
        this.temas.push(tema.$value))
      this.temas.sort();
    });

    this.route.paramMap.forEach(
      param => {
        this.tarea = this.db.object('/tareas/' + param.get('id'));
        this.tarea.subscribe(tarea => {
          this.analista = tarea.analista;
          this.revisor = tarea.revisor;
        })
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
        .then(a => 
          {
            this.saveLabelForm();
            this.messageService.sendMessage('La ficha ha sido guardada', 'success')
          })
        .catch(
        err => this.messageService.sendMessage(err.message, 'error')
        );
    }
    //Create new object
    else {
      this.db.list('/fichas').push(this.form)
        .then(a => {
          this.saveLabelForm();
          this.messageService.sendMessage('La ficha ha sido guardada', 'success');
          this.router.navigate(['Tarea', this.tarea.$ref.key, a.key]);
        })
        .catch(
        err => this.messageService.sendMessage(err.message, 'error')
        );;
    }
  }

  addElem(elem: string, type?: string) {
    switch (elem) {
      case 'lugar':
        this.form.lugares.push(new Item());
        break;
      case 'localidad':
        this.form.localidades.push(new Item());
        break;
      case 'quien':
        this.form.quienes.push(new Item(type));
        break;
      case 'dquien':
        this.form.dquienes.push(new Item(type));
        break;
      case 'dque':
        this.form.dques.push(new Item(type));
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

  goTo(location: string): void {
    window.location.hash = "";
    window.location.hash = location;
    window.scrollBy(0, 2);
  }

  //tooltip
  getInfo(event, tooltip: string, overlaypanel: OverlayPanel) {
    overlaypanel.container.style.width = "30%";
    overlaypanel.container.innerHTML = '<div class="ui-overlaypanel-content">' + this.tooltip[tooltip] + '</div>';
    overlaypanel.toggle(event, event.target);

  }

  //guardar nube
  saveLabelForm(){
    this.form.quienes.forEach(quien => this.saveLabel(quien.persona, "mencionados"));
    this.form.dquienes.forEach(quien => this.saveLabel(quien.persona, "mencionados"));
    this.form.dques.forEach(a => this.saveLabel(a.etiqueta, "temas"));
    this.form.localidades.forEach(a => this.saveLabel(a.localidad, "lugares"));
  }

  saveLabel(label: string, nube: string){
    if(label){
      let obj= this.db.object('/'+nube);
      obj.subscribe(object => {
        if(object.constructor != Array)
        {
          object = [];
        }
        if(object.indexOf(label)<0){
          object.push(label);
          obj.set(object);
        }
      });
    }

  };

  //Personas typeahead
  psearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.personas.filter(persona => persona.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  //Temas typeahead
  tsearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.temas.filter(tema => tema.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  //Localidades typeahead
  lsearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.lugares.filter(lugar => lugar.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

}
