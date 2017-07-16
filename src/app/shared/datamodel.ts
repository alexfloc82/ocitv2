export class Proposal
{
	area: Area[];
	estimates: Estimate[];
	end: Date;
	id: string;
	country:string;
	pms: string[];
	start: Date;
	travels: number;
	workload: number;
	closed: boolean;
}

export class Estimate
{
	user: string;
	hours:number;
}

export class Timesheet 
{
	id: string;
	user : string;
	propuesta : string;
	pm : string;
	year : string;
	month : string;
	q1 : number;
	q2 : number;
}

export class Travel 
{
	id : string;
	user : string;
	transport : number;
	taxi : number;
	commute : number;
	propuesta : string;
}

export class Holidays
{
	id : string;
	user : string;
	from : Date;
	to : Date;
}

export class User
{
	user : string;
	name : string;
	email : string;
}

export class Area 
{
	area: string;
	responsible : string;
	projectLead : string;
}
