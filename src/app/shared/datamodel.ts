import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Proposal {
	end: string;
	endDate: NgbDateStruct;
	id: string;
	country: string;
	pms: any[];
	responsible: string;
	start: string;
	startDate: NgbDateStruct;
	travels: number;
	workload: number;
	closed: boolean;
	title: string;
	comments: string;

	constructor(
		date?: string,
		ngbDate?: NgbDateStruct,
	) { 
		this.start = date;
		this.end = date;
		this.startDate = ngbDate;
		this.endDate = ngbDate;
	}
}

export class User {

	uid: string;
	name: string;
	email: string;
	lastname: string;
	role: string;

	constructor() { }
}
