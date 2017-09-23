import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { MessageService } from '../message/message.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  userProfile: Observable<any>;
  user: Observable<firebase.User>;
  users: FirebaseListObservable<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private messageService: MessageService) {
    this.user = firebaseAuth.authState;
    this.userProfile = new Observable(observer => observer.next(''))
    this.getProfile();
    this.users = db.list('/users');
  }

  signup(email: string, password: string, name: string, lastname: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        var user = { email: email, uid: value.uid, name: name, lastname: lastname, role: '30' };
        this.users.push(user).then(a => this.router.navigate(['/Home']))
      })
      .catch(err => this.messageService.sendMessage(err.message, 'error'))
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(a => this.getProfile())
      .catch(err =>
        this.messageService.sendMessage(err.message, 'error')
      );
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(a => this.router.navigate(['/Home']));
  }

  getProfile() {
    this.user.subscribe(userAuth => {
      this.db.list('/users', {
        query: {
          orderByChild: 'uid',
          equalTo: userAuth.uid
        }
      }
      ).subscribe(userProfile => {
        this.userProfile = new Observable(observer => observer.next(userProfile[0]));
      });
    });
  }

  sendResetPassword(email: string) {
    this.firebaseAuth.auth.sendPasswordResetEmail(email)
      .then(a => this.messageService.sendMessage('Un email a sido enviado a ' + email + ' para resetear su contraseña.', 'info'))
      .catch(err =>
        this.messageService.sendMessage(err.message, 'error')
      );
  }

  resetPass(newPass: string, code?: string) {

    if (code) {
      this.firebaseAuth.auth.confirmPasswordReset(code, newPass)
        .then(a => {
          this.messageService.sendMessage('Su contraseña ha sido reseteada correctamente', 'info');
          this.router.navigate(['/Home']);
        })
        .catch(err =>
          this.messageService.sendMessage(err.message, 'error')
        );

    }
    else {
      this.firebaseAuth.auth.currentUser.updatePassword(newPass)
        .then(a => {
          this.messageService.sendMessage('Su contraseña ha sido actualizada', 'info');
          this.router.navigate(['/Home']);
        })
        .catch(err =>
          this.messageService.sendMessage(err.message, 'error')
        );
    }

  }

  getEmail(code: string) {
    this.firebaseAuth.auth.verifyPasswordResetCode(code)
      .then(a => {
        this.messageService.sendMessage('Su contraseña ha sido actualizada', 'info');
      })
      .catch(err => {
        this.messageService.sendMessage(err.message, 'error');
      }
      );
  }

}
