import { ObjectModel } from "../object-model.model";
import { Caracteristique } from "./caracteristique.model";
import { Specification } from "./specification.model";
import { Utilisateur } from "./utilisateur.model";

export interface Voiture extends ObjectModel{
  proprietaire:string,
  description:string,
  immatriculation:string,
  specification:Specification,
  images_name:string[]
}
export class ClasseVoiture{
  private _idvoiture:string="";
  private _description:string="";
  private _immatriculation:string="";
  private _caracteristiques:Caracteristique[]=[];

  get caracteristiques(): Caracteristique[] {
    return this._caracteristiques;
  }

  set caracteristiques(value: Caracteristique[]) {
    this._caracteristiques = value;
  }

  get idvoiture(): string {
    return this._idvoiture;
  }

  set idvoiture(value: string) {
    this._idvoiture = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get immatriculation(): string {
    return this._immatriculation;
  }

  set immatriculation(value: string) {
    this._immatriculation = value;
  }

  init(obj:any) {
    this.idvoiture=obj._id;
    this.description=obj.description;
    this.immatriculation=obj.immatriculation;
    this.caracteristiques=obj.caracteristiques;
  }
}
export interface VoitureProprietaire extends ObjectModel{
  proprietaire:Utilisateur,
  description:string,
  immatriculation:string,
  specification:Specification,
  images_name:string[]
}
