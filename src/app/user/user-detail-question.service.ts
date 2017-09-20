import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { QuestionBase, TextboxQuestion, DropdownQuestion } from '../core/question/question-base';

@Injectable()
export class UserDetailQuestionService {
  // Todo: get from a remote source of question metadata∫
  // Todo: make asynchronous
  constructor(private db: AngularFireDatabase) {

  }

  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'First name',
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastname',
        label: 'Last name',
        order: 2
      }),

      new DropdownQuestion({
        key: 'role',
        label: 'Role',
        value: 'Standard',
        options: [
          { key: 'Admin', value: 'Admin' },
          { key: 'E-Team', value: 'E-Team' },
          { key: 'Standard', value: 'Standard' }
        ],
        order: 3
      })

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}