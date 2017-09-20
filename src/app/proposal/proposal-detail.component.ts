import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../core/utils/utils.service';
import { MessageService } from '../core/message/message.service';
import { AuthService } from '../core/auth/auth.service';

import { User, Proposal } from '../shared/datamodel';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css']
})
export class ProposalDetailComponent implements OnInit {

  loader = false; //to control loading
  proposal: FirebaseObjectObservable<any>; //To keep reference to database Object
  users: User[]; // list of elegible users
  areas: { key: string, value: string }[] = [];
  selectedUser: User; // Curently selected user
  selectedResources: User[];
  form: Proposal; //form data

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private location: Location,
    public utils: UtilsService,
    public authService: AuthService,
    public messageService: MessageService) {

    this.loader = true;
    this.db.list('/users').subscribe(a => this.users = a);
    this.db.list('/areas').subscribe(areas => areas.forEach(area =>  this.areas.push({ key: area.$key, value: area.id })));

  }

  ngOnInit() {
    this.route.paramMap.forEach(
      param => {
        // new proposal
        if (param.get('id') == '-') {
          let now = new Date().toISOString();
          this.form = new Proposal(now, this.utils.convertISOToNgbDate(now));
          this.authService.userProfile.subscribe(user =>
            {
              this.form.responsible = user.$key;
              this.db.object('/users/'+ user.$key).subscribe(user => this.selectedUser = user);
            }
          );
          this.loader = false;
        }
        // Editing proposal
        else {
          this.proposal = this.db.object('/proposals/' + param.get('id'))
          this.proposal.subscribe(
            a => {
              this.form = a;
              this.db.object('/users/' + a.responsible).subscribe(b => this.selectedUser = b);
              this.loader = false;
            }
          )
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.form.start = this.utils.convertNgbDateToISO(this.form.startDate);
    this.form.end = this.utils.convertNgbDateToISO(this.form.endDate);
    //Update object in database
    if (this.proposal) {
      this.proposal.update(this.form).then(a => this.location.back()).catch(
        err => this.messageService.sendMessage(err.message, 'error')
      );
    }
    //Create new object
    else {
      this.db.list('/proposals').push(this.form).then(a => this.location.back()).catch(
        err => this.messageService.sendMessage(err.message, 'error')
      );;
    }
  }

  toggleClose(isClosed: boolean) {
    this.proposal.update({ closed: isClosed }).then(a => this.location.back()).catch(
      err => this.messageService.sendMessage(err.message, 'error')
    );
  }

  addEstimates() {
  }
  //Uer typeahead
  usearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.users.filter(user => (user.name + ' ' + user.lastname).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  uformatter = (user: User) => user.name + ' ' + user.lastname;

  selectUser(selectedItem: any) {
    this.form.responsible = selectedItem.item.$key;
  }

  selectResource(selectedItem: any, index: number) {
    
  }

  deleteResource(index: number) {
    
  }

  addRelease() {
    if (!this.form.pms) {
      this.form.pms = [];
    }
    this.form.pms.push({value:''});
  }

  deleteRelease(index: number) {
    this.form.pms.splice(index, 1);
  }

}
