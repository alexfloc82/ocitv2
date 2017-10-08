import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../core/utils/utils.service';
import { MessageService } from '../core/message/message.service';
import { AuthService } from '../core/auth/auth.service';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.css']
})
export class DesplegableComponent implements OnInit {

  loader = false;
  desplegables: any[];
  selectedItem: any;
  sItemArray: any[];


  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public utils: UtilsService,
    public authService: AuthService,
    public messageService: MessageService) {

    this.loader = true;
  }

  ngOnInit() {
    this.db.list('/values').subscribe(desp => {
      this.desplegables = desp;
      this.loader = false;
      this.selectItem(desp[0]);
    })
  }

  selectItem(selectedItem: any) {
    this.selectedItem = selectedItem;

    this.sItemArray = [];
    for (var x in this.selectedItem) {
      this.selectedItem.hasOwnProperty(x) && this.sItemArray.push({ "key": x, "value": this.selectedItem[x] });
    }

  };

  onSubmit(){
    let newItem = {};
    this.sItemArray.forEach(pair => {
      newItem[pair['key']] = pair['value'];
    })

    this.db.object('/values/' + this.selectedItem.$key)
    .set(newItem)
    .then(ok =>  this.messageService.sendMessage("Los datos han sido guardados", 'success'))
    .catch(err =>  this.messageService.sendMessage(err.message, 'error'));
  }

  goBack(){
    this.selectItem(this.selectedItem);
  }

  deleteItem(i){
    this.sItemArray.splice(i,1);
  }

  addItem(){
    this.sItemArray.push({"key":"","value":""});
  }

  goTo(url:string){
    this.router.navigate([url]);
  }

}
