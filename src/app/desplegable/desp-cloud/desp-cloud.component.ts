import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../../core/utils/utils.service';
import { MessageService } from '../../core/message/message.service';
import { AuthService } from '../../core/auth/auth.service';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-desp-cloud',
  templateUrl: './desp-cloud.component.html',
  styleUrls: ['./desp-cloud.component.css']
})
export class DespCloudComponent implements OnInit {
  loader = false;
  personajes: any[];
  temas: any[];
  lugares: any[];
  selectedItem: any;



  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public utils: UtilsService,
    public authService: AuthService,
    public messageService: MessageService) {

    this.loader = true;
    this.db.list('/mencionados').subscribe(personajes => this.personajes = personajes.sort(this.compare));
    this.db.list('/lugares').subscribe(lugares => this.lugares = lugares.sort(this.compare));
    this.db.list('/temas').subscribe(temas => this.temas = temas.sort(this.compare));

  }

  ngOnInit() {
    this.selectItem('Personajes');
    this.loader = false;
  }

  selectItem(selectedItem: string) {
    this.selectedItem = selectedItem;
  };

  onSubmit(){
    switch (this.selectedItem) {
      case 'Personajes':
        let pers = [];
        this.personajes.forEach(item => pers.push(item['$value']));
        this.db.object('/mencionados').set(pers)
        .then(a => {
          this.db.list('/mencionados').subscribe(personajes => this.personajes = personajes.sort(this.compare));
          this.messageService.sendMessage('Los personajes han sido guardados', 'success');})
        .catch(err => this.messageService.sendMessage(err.message, 'error'));
        break;
        case "Localidades":
        let lugars = [];
        this.lugares.forEach(item => lugars.push(item['$value']));
        this.db.object('/lugares').set(lugars)
        .then(a => {this.db.list('/lugares').subscribe(lugares => this.lugares = lugares.sort(this.compare));
        this.messageService.sendMessage('Las localidades han sido guardadas', 'success');})
        .catch(err => this.messageService.sendMessage(err.message, 'error'));
        break;
        case "Temas":
        let temas = [];
        this.temas.forEach(item => temas.push(item['$value']));
        this.db.object('/temas').set(temas)
        .then(a => {this.db.list('/temas').subscribe(temas => this.temas = temas.sort(this.compare));
        this.messageService.sendMessage('Los temas han sido guardados', 'success');})
        .catch(err => this.messageService.sendMessage(err.message, 'error'));
        break;
      default:
        break;
    }
  }

  goBack(){
    this.router.navigate(['Desplegable/etiquetas']);
  }

  deleteItem(i, object:string[]){
    object.splice(i,1);
  }

  addItem(object:any[]){
    object.unshift({$value:""});
  }

  compare(a: any,b: any){
    if(a.$value.toLowerCase() > b.$value.toLowerCase())
    {
      return 1;
    }
    return -1;
    
  }

}
