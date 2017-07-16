import { Injectable }       from '@angular/core';

import { QuestionBase, TextboxQuestion, DropdownQuestion}     from '../core/question/question-base';

@Injectable()
export class UserSigninQuestionService {

  // Todo: get from a remote source of question metadata∫
  // Todo: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'First name',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastname',
        label: 'Last name',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        key: 'adsuser',
        label: 'ADS User',
        required: true,
        order: 4
      }),

      new TextboxQuestion({
        key: 'password',
        label: 'Pasword',
        type:'password',
        required: true,
        order: 5
      }),

      new TextboxQuestion({
        key: 'confirm',
        label: 'Confirm password',
        type: 'password',
        required: true,
        order: 5
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}