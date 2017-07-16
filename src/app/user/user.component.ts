import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: FirebaseListObservable<any>;
  public email: string;

  constructor(db: AngularFireDatabase, private router: Router) {
    this.users = db.list('/users');
  }

  ngOnInit() {
    this.email = "alexandre.floquet@gmail.com";
  }

  gotoDetail(id: string): void {
    this.router.navigate(['/User', id]);
  }

}
