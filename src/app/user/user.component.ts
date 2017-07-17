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
  loader=false;
  users: any[];
  filteredUsers: any[];
  public email: string;

  constructor(
    db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute,) {
    this.loader=true;
    db.list('/users').subscribe(a => {
      this.users = a; 
      this.filteredUsers = a; 
      this.loader=false;});
  }

  ngOnInit() {
    
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onFilter(value:string){
    this.filteredUsers = this.users.filter(user => 
        user.adsuser.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.name.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.email.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.lastname.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1)
  }

  private showLoader(): void {
        console.log('Show loader');
    }

  private hideLoader(): void {
        console.log('Hide loader');
    }

}
