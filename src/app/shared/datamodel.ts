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
	password: string;
	confirm: string;

	constructor() { }
}

export class Tarea {

	analista: string;
	bh: number;
	bm: number;
	bs: number;
	cadena: string;
	create_date: NgbDateStruct;
	create_user: string;
	date: NgbDateStruct;
	edicion: string;
	eh: number;
	em: number;
	es: number;
	fichas: Ficha[];
	revisor: string;
	semestre: string;
	update_date: NgbDateStruct;
	update_user: string;

	constructor() {
		this.fichas = [];
	}
}

export class Ficha {

	ambito: string;
	bhour: number;
	bmin: number;
	bsec: number;
	catTem:string;
	context: string;
	declhombre: number;
	declmujeres: number;
	dques: Item[];
	dquienes: Item[];
	ehour: number;
	emin: number;
	equilibrio: string;
	esec: string;
	espConjunto:boolean;
	fDirecta: number;
	fGenerica: number;
	format: string;
	fuente: string;
	genero: string;
	infoAparece: string;
	informador: string;
	lugares: Item[]
	localidades: Item[]
	observaciones: string;
	origen: string[];
	quienes: Item[];
	retorica: string[];
	rotulos: string[];
	title: string;
	valedit: string;
	
	constructor() {
		this.dquienes = [];
		this.dques = [];
		this.lugares = [];
		this.localidades = [];
		this.quienes = [];
	}
}

export class Item {
	pais:string;
	comunidad:string;
	localidad:string;
	categoria: string;
	etiqueta: string;
	valor:number;
	constructor() {}
}