import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-desp-admin',
  templateUrl: './desp-admin.component.html',
  styleUrls: ['./desp-admin.component.css']
})
export class DespAdminComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
  
    ngOnInit() {
    }
}
