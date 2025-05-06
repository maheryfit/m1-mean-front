import { ObjectModel } from "../object-model.model";
import { Utilisateur } from "./utilisateur.model";
import {Niveau} from './niveau.model';
import {Role} from './role.model';

export interface Mecanicien extends ObjectModel{
  utilisateur:Utilisateur,
  telephone:string,
  role:string,
  niveau:string
}
export interface MecanicienDetails extends ObjectModel{
  utilisateur:{
    nom:string,
    prenom:string,
    nom_utilisateur:string
  },
  telephone:string,
  role:{
    titre:string,
    salaire_mensuel:number
  },
  niveau:{
    titre:string,
    coefficient_salarial:number
  }
}
export class ClasseMecanicien{
  private _idmecanicien:string="";
  private _nom:string="";
  private _prenom:string="";
  private _telephone:string="";
  private _niveau:Niveau=new Niveau();
  private _role:Role=new Role();
  private _utilisateur:{_id:string,nom_utilisateur:string}={_id:"",nom_utilisateur:""};

  get utilisateur(): { _id: string; nom_utilisateur: string } {
    return this._utilisateur;
  }

  set utilisateur(value: { _id: string; nom_utilisateur: string }) {
    this._utilisateur = value;
  }

  get idmecanicien(): string {
    return this._idmecanicien;
  }

  set idmecanicien(value: string) {
    this._idmecanicien = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }

  get niveau(): Niveau {
    return this._niveau;
  }

  set niveau(value: Niveau) {
    this._niveau = value;
  }

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }

  init(obj:any){
    this.idmecanicien = obj._id;
    this.nom = obj.nom;
    this.prenom = obj.prenom;
    this.telephone = obj.telephone;
    this.niveau=new Niveau();
    if(obj.niveau!==undefined){
      this.niveau.init(obj.niveau);
    }
    this.role=new Role();
    if(obj.role!==undefined){
      this.role.init(obj.role);
    }
    this.utilisateur=obj.utilisateur;
  }
}
