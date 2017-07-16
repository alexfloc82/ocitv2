import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class MessageService {
    emitter  = new Subject<any>();
    constructor() { }

    sendMessage(message:string, type:string) {
        this.emitter.next({'text':message, 'type':type});
    }

    clearMessage() {
        this.emitter.next({'text':'', 'type':''});
    }

    getMessage(): Observable<any> {
        return this.emitter.asObservable();
    }
}