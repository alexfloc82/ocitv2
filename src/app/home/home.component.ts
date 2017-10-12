import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import "firebase/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  documents: any[];
  url: string;
  email: string;
  password: string;

  constructor(public authService: AuthService, private router: Router, private db: AngularFireDatabase) {
    db.list('/documentos').subscribe(documentos => {
      this.documents = [];
      documentos.forEach(document => {
        firebase.storage().ref(document.url).getDownloadURL().then(url => {
          document.url = url;
          this.documents.push(document);
        }
        );

      })
    })

  }

  ngOnInit() {
  }

  gotoMenu(menu: string): void {
    this.router.navigate([menu]);
  }

  signIn() {
    this.router.navigate(['/user', 'Signin']);
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  resetPassword() {
    this.router.navigate(['user/Forgot']);
  }

}
