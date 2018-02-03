import { Component, OnInit } from '@angular/core';

//import {DashboardService} from './dashboard.service';
import {Tarea} from '../shared/datamodel';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedItem:string;
  semestre:FirebaseListObservable<any[]>;
  query:any;
  loader:boolean;
  piezas: any[];
  informativos: any[];
  lugares: any[];
  locals: any[];
  quienes: any[];
  dquienes: any[];
  dques: any[];

  combos: any;

  constructor(
    //private dashService : DashboardService,
    private db: AngularFireDatabase
  ) { 
    
    this.semestre = this.db.list('/values/semestre');
    this.query = {semestre:""};

  }

  ngOnInit() {
    this.loader = true; 
    this.selectedItem = 'informativos';
    this.query = {semestre:""};
    this.db.object('/values').subscribe(combos => 
      {
        this.combos = combos;
        this.emitNormTarea();
        this.loader = false; 
      });
     
  }

  selectItem(selectedItem: any) {
    this.selectedItem = selectedItem;
  }

  performQuery(){
    this.setQuery(this.query);
    this.emitNormTarea();
  }

  formatPiezas(piezas: any[]) {  
    this.lugares = [];
    this.locals = [];
    this.quienes = [];
    this.dquienes = [];
    this.dques = [];

    piezas.forEach(pieza => {
      pieza.lugares.forEach(lugar => {
        lugar['id_tarea'] = pieza.id_tarea;
        lugar['ambito'] = pieza['ambito-l'];
        lugar['zona'] = pieza['zona-l'];
        lugar['espConjunto'] = pieza['espConjunto'];
        this.lugares.push(lugar);
      });

      pieza.localidades.forEach(local =>{
        local['id_tarea'] = pieza.id_tarea;
        this.locals.push(local);
      });

      pieza.quienes.forEach(quien =>{
        quien['id_tarea'] = pieza.id_tarea;
        this.quienes.push(quien);
      });

      pieza.dquienes.forEach(quien =>{
        quien['id_tarea'] = pieza.id_tarea;
        this.dquienes.push(quien);
      });

      pieza.dques.forEach(dque =>{
        dque['id_tarea'] = pieza.id_tarea;
        dque['tematica']=pieza['catTem-l'];
        this.dques.push(dque);
      });

     // pieza['retorica'] = '';
     // pieza.retorica.forEach(retorica => pieza['retorica']=pieza['retorica'] + ' ' + retorica['retorica-l'])

    });

    this.loader = false;
  }

  emitNormTarea(){
    if(!this.combos){return null;}
    this.db.list('/tareas')
    .subscribe(tareas => {
        let fileteredTarea = tareas.filter(a=> (this.query.semestre =="" || this.query.semestre == a.semestre));//prepara el filtro con la query
        fileteredTarea.forEach((tarea, index, tareas)=>{
            tarea['cadena-l'] = this.combos.cadena[tarea.cadena];
            tarea['edicion-l'] = this.combos.edicion[tarea.edicion];
            tarea['semestre-l'] = this.combos.semestre[tarea.semestre];
            tarea['duracion'] = (tarea.eh-tarea.bh)*3600 + (tarea.em - tarea.bm)*60 + (tarea.es-tarea.bs);
        })
        this.informativos = fileteredTarea;
        this.emitNormFicha();
    });
  }

  emitNormFicha(){
    if(!this.combos){return null;}
    this.db.list('/fichas')
    .subscribe(fichas => {
        fichas.forEach((ficha, index, fichas)=>{
          ficha['tarea'] = this.informativos.filter(a=>ficha.tarea_id==a.$key)[0];
        });
        let fileteredFicha = fichas.filter(a=>(this.query.semestre =="" || this.query.semestre == a.tarea.semestre));//prepara el filtro con la query
        fileteredFicha.forEach((ficha, index, fichas)=>{
          ficha['id_tarea'] = ficha.tarea.id_tarea;
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
              lugar['title'] = ficha.title;
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
              lugar['title'] = ficha.title;
            })
          }
          else{
            ficha['localidades']=[];
          }
          if(ficha.dques){
            ficha.dques.forEach(dque =>{
              dque['pieza'] = ficha.$key;
              dque['title'] = ficha.title;
              if(dque.categoria){dque['categoria-l']=this.combos.dqcategoria[dque.categoria];}
            })
          }
          else{
            ficha['dques']=[];
          }
          if(ficha.quienes){
            ficha.quienes.forEach(quien =>{
              quien['pieza'] = ficha.$key;
              quien['title'] = ficha.title;
              if(quien.categoria){quien['categoria-l']=this.combos.categoria[quien.categoria];}
            })
          }
          else{
            ficha['quienes']=[];
          }
          if(ficha.dquienes){
            ficha.dquienes.forEach(dquien =>{
              dquien['pieza'] = ficha.$key;
              dquien['title'] = ficha.title;
              if(dquien.categoria){dquien['categoria-l']=this.combos.categoria[dquien.categoria];}
            })
          }
          else{
            ficha['dquienes']=[];
          }
          if(ficha.origen){
            ficha['origen-l']=[];
            ficha.origen.forEach(valor =>{
              ficha['origen-l'].push({key:valor, title:ficha.title, value:this.combos.origen[valor], pieza: ficha.$key});
            })
          }
          else{
            ficha['origen']=[];
          }
          if(ficha.rotulos){
            ficha['rotulos-l']=[];
            ficha.rotulos.forEach(valor =>{
              ficha['rotulos-l'].push({key:valor, title:ficha.title, value:this.combos.rotulos[valor], pieza: ficha.$key})
            })
          }
          else{
            ficha['rotulos']=[];
          }
          if(ficha.retorica){
            ficha['retorica-l']=[];
            ficha.retorica.forEach(valor =>{
              ficha['retorica-l'].push({key:valor, title:ficha.title, value:this.combos.retorica[valor], pieza: ficha.$key})
            })
          }
          else{
            ficha['retorica']=[];
          }
          ficha['duracion'] = (ficha.ehour-ficha.bhour)*3600 + (ficha.emin - ficha.bmin)*60 + (ficha.esec-ficha.bsec);
        })
        this.piezas =fileteredFicha;
        this.formatPiezas(this.piezas);
    });
  }

  setQuery(query: any){
    this.query=query;
    this.emitNormTarea();
    this.emitNormFicha();
  }
}
