import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../core/question/question-base';
import { QuestionControlService } from '../core/question/question-control.service';

import { UserDetailQuestionService } from './user-detail-question.service';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-user',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
    providers: [UserDetailQuestionService]
})
export class UserDetailComponent implements OnInit {
    user: FirebaseObjectObservable<any>;
    questions: any[];
    form: FormGroup;

    constructor(
        private qcs: QuestionControlService,
        service: UserDetailQuestionService,
        private db: AngularFireDatabase,
        private route: ActivatedRoute,
        private location: Location) {
        this.questions = service.getQuestions();
        this.route.paramMap.forEach(param => this.user = this.db.object('/users/' + param.get('id')));
    }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
        this.route.paramMap.forEach(param => this.db.object('/users/' + param.get('id')).subscribe(d => {
            this.questions.forEach(question => { question.value = d[question.key] });
            this.form = this.qcs.toFormGroup(this.questions);
        }));
    }

    goBack(): void {
        this.location.back();
    }

    onSubmit() {
        this.user.update(this.form.value).then(a => this.location.back());
    }

}
