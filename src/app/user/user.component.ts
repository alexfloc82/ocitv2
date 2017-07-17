import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute,) {
    this.users = db.list('/users');
  }

  ngOnInit() {
    this.email = "alexandre.floquet@gmail.com";
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

}
