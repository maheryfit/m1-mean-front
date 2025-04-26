import { ObjectModel } from "../object-model.model";

export interface Station extends ObjectModel{
  nom:string,
  lieu:string,
  coordonnees:{
    type:string,
    coordinates:number[]
  }
}
export class ClasseStation{
  private _idstation:string="";
  private _nom:string="";
  private _lieu:string="";
  private _coordonnees:{ type:string,coordinates:number[] }={ type:"",coordinates:[] };

  get idstation(): string {
    return this._idstation;
  }

  set idstation(value: string) {
    this._idstation = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get lieu(): string {
    return this._lieu;
  }

  set lieu(value: string) {
    this._lieu = value;
  }

  get coordonnees(): { type: string; coordinates: number[] } {
    return this._coordonnees;
  }

  get coordonneString():string {
    const coordonnes = `${this._coordonnees.coordinates[0]}, ${this.coordonnees.coordinates[1]}`;
    return coordonnes;
  }

  set coordonnees(value: { type: string; coordinates: number[] }) {
    this._coordonnees = value;
  }
  init(obj:any){
    this.idstation=obj._id;
    this.nom=obj.nom;
    this.lieu=obj.lieu;
    this.coordonnees=obj.coordonnees;
  }
  constructor(obj:any) {
    this.idstation=obj._idstation;
    this.nom=obj._nom;
    this.lieu=obj._lieu;
    this.coordonnees=obj._coordonnees;
  }
}
