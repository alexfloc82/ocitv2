import {Injectable} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class UtilsService {

  convertNgbDateToISO(ngbDate: NgbDateStruct ){
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day).toISOString();
  }

  convertISOToNgbDate(isodate:string){ 
    var date = new Date(isodate);
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDay()};
  }
}