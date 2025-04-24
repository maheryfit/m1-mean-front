import { ObjectModel } from "../object-model.model";

export interface Service extends ObjectModel{
  nom:string,
  description:string,
  duree_estimee:number,
  tarif:{
    $numberDecimal:number
  }
}
export class ClasseService{
  private _idservice:string="";
  private _nom:string="";
  private _tarif:number=0;
  private _duree:number=0;

  get idservice(): string {
    return this._idservice;
  }

  set idservice(value: string) {
    this._idservice = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get tarif(): number {
    return this._tarif;
  }

  set tarif(value: number) {
    this._tarif = value;
  }

  get duree(): number {
    return this._duree;
  }

  set duree(value: number) {
    this._duree = value;
  }

  init(obj:any) {
    this.idservice = obj._id;
    this.nom = obj.nom;
    this.tarif = obj.tarif;
    this.duree = obj.duree;
  }
}
