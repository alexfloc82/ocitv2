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
	analizado: boolean;
	bh: number;
	bm: number;
	bs: number;
	cadena: string;
	create_date: NgbDateStruct;
	create_user: string;
	date: string;
	dateNgb: NgbDateStruct;
	edicion: string;
	eh: number;
	em: number;
	es: number;
	fichas: Ficha[];
	id_tarea:string;
	revisor: string;
	revisado:boolean;	
	semestre: string;
	update_date: NgbDateStruct;
	update_user: string;

	constructor(
		date?: string,
		ngbDate?: NgbDateStruct,
	) {
		this.fichas = [];
		this.date = date;
		this.dateNgb = ngbDate;
		this.bh = 0;
		this.bm = 0;
		this.bs = 0;
		this.eh = 0;
		this.em = 0;
		this.es = 0;
	}
}

export class Ficha {

	tarea_id:string;
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
	esec: number;
	espConjunto:boolean;
	fConfidencial: number;
	fDir: number;
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
	terminado: boolean;
	valorAmbito: number;
	valedit: string;
	
	constructor(
		tarea?: string,
	) {
		this.tarea_id = tarea;
		this.dquienes = [];
		this.dques = [];
		this.lugares = [];
		this.localidades = [];
		this.quienes = [];
		this.retorica = [];
		this.rotulos = [];
		this.origen = [];
		this.terminado = false;

		this.bhour = 0;
		this.bmin = 0;
		this.bsec = 0;
		this.ehour = 0;
		this.emin = 0;
		this.esec = 0;
		this.fConfidencial = 0;
		this.fDir = 0;
		this.fGenerica = 0;
		this.declhombre = 0;
		this.declmujeres = 0;
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

export class Data{
	datasets: any[];

	constructor(backgroundColors: any[], data:any[]){
		this.datasets = [];
		this.datasets.push({
			data:data,
			backgroundColor:backgroundColors,
			hoverBackgroundColor: backgroundColors});
	}
}