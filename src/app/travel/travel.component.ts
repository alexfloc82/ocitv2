import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  loader=false;
  travels: any[];
  filteredTravels: any[];
  public email: string;

  constructor(
    db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute,) {
    this.loader=true;
    db.list('/travels').subscribe(a => {
      this.travels = a; 
      this.travels.forEach(travel =>  
          db.object('/users/'+ travel.user).subscribe(a => { travel.userObj = a;}) 
        )
      this.filteredTravels = this.travels; 
      this.loader=false;});
  }

  ngOnInit() {
    
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onFilter(value:string){
    this.filteredTravels = this.travels.filter(travel => 
        travel.expenses.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        travel.finish.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        travel.proposal.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        travel.start.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1)
  }

  private showLoader(): void {
        console.log('Show loader');
    }

  private hideLoader(): void {
        console.log('Hide loader');
    }


}
