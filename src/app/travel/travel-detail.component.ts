import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { User, Proposal, Travel } from '../shared/datamodel';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-user',
    templateUrl: './travel-detail.component.html',
    styleUrls: ['./travel-detail.component.css'],
    providers: []
})
export class TravelDetailComponent implements OnInit {
    loader = false;
    travel: FirebaseObjectObservable<any>;
    users: User[];
    proposals: Proposal[];
    selectedProposal: Proposal;
    selectedUser: User;
    form: Travel;

    constructor(
        private db: AngularFireDatabase,
        private route: ActivatedRoute,
        private location: Location) {
        this.loader = true;
        this.route.paramMap.forEach(param => this.travel = this.db.object('/travels/' + param.get('id')));
        this.db.list('/proposals').subscribe(b => this.proposals = b);
        this.db.list('/users').subscribe(a => this.users = a);


    }

    ngOnInit() {
        this.route.paramMap.forEach(param => this.db.object('/travels/' + param.get('id')).subscribe(
            a => {
                this.form = a;
                this.db.object('/proposals/' + a.proposal).subscribe(b => this.selectedProposal = b);
                this.db.object('/users/' + a.user).subscribe(b => this.selectedUser = b);
                this.loader = false;
            }
        ));
    }

    goBack(): void {
        this.location.back();
    }

    onSubmit() {
        this.travel.update(this.form).then(a =>
            this.location.back()
        );
    }

    //Proposal typeahead
    psearch = (text$: Observable<string>) =>
        map.call(debounceTime.call(text$, 200),
            term => term === '' ? [] : this.proposals.filter(v => v.id.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    pformatter = (proposal: Proposal) => proposal.id;

    selectProposal(selectedItem: any) {
        this.form.proposal = selectedItem.item.$key;
    }

    //Uer typeahead
    usearch = (text$: Observable<string>) =>
        map.call(debounceTime.call(text$, 200),
            term => term === '' ? [] : this.users.filter(user => (user.adsuser + ' - ' + user.name + ' ' + user.lastname).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    uformatter = (user: User) => user.adsuser + ' - ' + user.name + ' ' + user.lastname;

    selectUser(selectedItem: any) {
        this.form.user = selectedItem.item.$key;
    }

}
