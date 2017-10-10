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
  personajes: string[];
  temas: string[];
  lugares: string[];
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

    this.db.list('/mencionados').subscribe(personajes => this.personajes = personajes.sort());
    this.db.list('/lugares').subscribe(lugares => this.lugares = lugares.sort());
    this.db.list('/temas').subscribe(temas => this.temas = temas.sort());

  }

  ngOnInit() {
    this.selectItem('Personajes');
    this.loader = false;
  }

  selectItem(selectedItem: string) {
    this.selectedItem = selectedItem;
  };

  onSubmit(){
  }

  goBack(){
    this.location.back();
  }

  deleteItem(i, object:string[]){
    object.splice(i,1);
  }

  addItem(object:string[]){
    object.push("");
  }

}
