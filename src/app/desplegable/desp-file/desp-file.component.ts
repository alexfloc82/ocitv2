import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as firebase from 'firebase/app';
import "firebase/storage";

@Component({
  selector: 'app-desp-file',
  templateUrl: './desp-file.component.html',
  styleUrls: ['./desp-file.component.css']
})
export class DespFileComponent implements OnInit {
  url: string;
  items:any;
  constructor(
  ) { 

    let storage = firebase.storage().ref('ayuda/protocolo.pdf').getDownloadURL().then(url => this.url = url)


  }

  ngOnInit() {
    
  }

}
