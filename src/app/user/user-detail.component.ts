import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../core/utils/utils.service';
import { MessageService } from '../core/message/message.service';
import { AuthService } from '../core/auth/auth.service';

import { User } from '../shared/datamodel';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-user',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
    providers: []
})
export class UserDetailComponent implements OnInit {

    loader = false; //to control loading
    user: FirebaseObjectObservable<any>; //To keep reference to database Object
    form: User; //form data

    constructor(
        private db: AngularFireDatabase,
        private route: ActivatedRoute,
        private location: Location,
        public utils: UtilsService,
        public authService: AuthService,
        public messageService: MessageService) {
        this.loader = true;
    }

    ngOnInit() {
        this.route.paramMap.forEach(
            param => {
                this.user = this.db.object('/users/' + param.get('id'))
                this.user.subscribe(
                  a => {
                    this.form = a;
                    this.loader = false;
                  }
                )
            }
          );
    }

    goBack(): void {
        this.location.back();
    }
    
    onSubmit() {
    //Update object in database
    if (this.user) {
        this.user.update(this.form).then(a => this.location.back()).catch(
          err => this.messageService.sendMessage(err.message, 'error')
        );
      }
    }

}
