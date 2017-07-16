import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './core/auth/auth.service';
import { MessageService } from './core/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  message={text:'', type:'success'};
  subscription: Subscription;

  constructor(
    public authService: AuthService, 
    public router: Router,
    public messageService: MessageService) {
      this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Home']);
  }

  clearMessage(){
    this.messageService.clearMessage();
  }

}
