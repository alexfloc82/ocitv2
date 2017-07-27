import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

export class QuestionBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }


}

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }

  getAreas(db:AngularFireDatabase){
    db.list('/areas').subscribe(areas => areas.forEach(area => this.options.push({ key: area.$key, value: area.id })));
  }
}


export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/