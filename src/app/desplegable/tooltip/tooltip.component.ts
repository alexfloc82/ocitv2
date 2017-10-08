import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../../core/utils/utils.service';
import { MessageService } from '../../core/message/message.service';
import { AuthService } from '../../core/auth/auth.service';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  loader = false;
  tooltips: any[];
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
  }

  ngOnInit() {
    this.db.list('/tooltip').subscribe(desp => {
      this.tooltips = desp;
      this.loader = false;
      this.selectItem(desp[0]);
    })
  }

  selectItem(selectedItem: any) {
    this.selectedItem = selectedItem;
  };

  onSubmit(){
    let newItem = {};
    newItem[this.selectedItem.$key] = this.selectedItem.$value;

    this.db.object('/tooltip')
    .update(newItem)
    .then(ok =>  this.messageService.sendMessage("Los datos han sido guardados", 'success'))
    .catch(err =>  this.messageService.sendMessage(err.message, 'error'));
  }

  goBack(){
    this.location.back();
  }
  goTo(url:string){
    this.router.navigate([url]);
  }

}
