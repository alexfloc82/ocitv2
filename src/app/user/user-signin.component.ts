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
    templateUrl: './user-signin.component.html',
    styleUrls: ['./user-detail.component.css'],
    providers: []
})
export class UserSigninComponent implements OnInit {
    questions: any[];
    form: User; //form data

    constructor(
        private db: AngularFireDatabase,
        private route: ActivatedRoute,
        private auth: AuthService,
        private location: Location,
        public utils: UtilsService,
        public authService: AuthService,
        public messageService: MessageService) {
    }

    ngOnInit() {
       this.form = new User;
    }

    goBack(): void {
        this.location.back();
    }

    onSubmit() {

        if(!this.form.email.endsWith('ucm.es'))
        {
            this.messageService.sendMessage("Se requiere una cuenta de correo de la complutense 'ucm.es' para registrarse", 'error')
            return false;
        }

        if (this.form.password == this.form.confirm) {
            this.auth.signup(
                this.form.email,
                this.form.password,
                this.form.name,
                this.form.lastname);
        }
        else {
            this.messageService.sendMessage("la contraseña introducida no coincide con la de confirmación", 'error')
        }

    }

}
