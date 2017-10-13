import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as firebase from 'firebase/app';
import "firebase/storage";

import { AngularFireDatabase } from 'angularfire2/database';

import { Documento } from '../../shared/datamodel';

import { MessageService } from '../../core/message/message.service';

@Component({
  selector: 'app-desp-file',
  templateUrl: './desp-file.component.html',
  styleUrls: ['./desp-file.component.css']
})
export class DespFileComponent implements OnInit {
  documents: Documento[];
  form: Documento;
  loader: boolean;
  percentage: string;

  constructor(
    public db: AngularFireDatabase,
    public messageService: MessageService
  ) {
    this.loader = true;
    this.percentage = "none";

    db.list('/documentos').subscribe(documentos => {
      this.documents = [];
      documentos.forEach(document => {
        firebase.storage().ref(document.url).getDownloadURL().then(url => {
          document.downloadUrl = url;
          this.documents.push(document);
        });
      });
      this.loader = false;
    })


  }

  ngOnInit() {
    this.form = new Documento();
  }

  deleteItem(document: any) {
    firebase.storage().ref(document.url).delete()
      .then(doc => {
        this.db.list('/documentos').remove(document.$key)
          .then(ok => this.messageService.sendMessage("El documento ha sido eliminado", 'success'))
          .catch(err => this.messageService.sendMessage(err.message, 'error'));
      })
      .catch(err => this.messageService.sendMessage(err.message, 'error'));

  }

  saveItem() {
    this.percentage = "0%";
    let task = firebase.storage().ref('ayuda/' + this.form.file.name).put(this.form.file);

    task.on('state_changed',
      snapshot => {
        this.percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100+'%'
      },
      err => this.messageService.sendMessage(err.message, 'error'),
      () => {
        this.form.url = 'ayuda/' + this.form.file.name;
        this.db.list('/documentos').push(this.form)
          .then(ok => {
            this.messageService.sendMessage("El documento ha sido insertado", 'success');
            this.percentage = "none";
          })
          .catch(err => this.messageService.sendMessage(err.message, 'error'))
      }
    );
  }

  setFile(event: any) {
    this.form.file = event.target.files[0];
  }

}
